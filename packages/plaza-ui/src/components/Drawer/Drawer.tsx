import {useLockBody} from '@plaza-ui/hooks/lib/useLockBody';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {
  forwardRef,
  ReactNode,
  Ref,
  useCallback,
  useEffect,
  useState,
} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import capitalize from '../../utils/capitalize';
import Backdrop from '../Backdrop';
import Fade from '../Fade';
import Slide from '../Slide';
import * as S from './Drawer.styled';
import {DrawerClasses, getDrawerUtilityClass} from './drawerClasses';

export interface DrawerTransition {
  enter: number;
  exit: number;
}

export type DrawerAnchor = 'bottom' | 'left' | 'right' | 'top';
export type DrawerVariant = 'permanent' | 'persistent' | 'temporary';

export type DrawerProps = {
  children?: ReactNode;
  component?: Component;
  isOpen?: boolean;
  onClose?: () => void;
  zIndex?: number;
  transition?: DrawerTransition;
  anchor?: DrawerAnchor;
  variant?: DrawerVariant;
  overlayColor?: string;
  overlayAlpha?: number;
  hasBackdrop?: boolean;
  sx?: SxType;
  classes?: Partial<DrawerClasses>;
  className?: string;
};

const oppositeDirection = {
  left: 'right',
  right: 'left',
  top: 'down',
  bottom: 'up',
};

const useUtilityClasses = (
  ownerState: Pick<DrawerProps, 'classes' | 'anchor' | 'variant'>,
) => {
  const {classes, anchor, variant} = ownerState;

  const slots = {
    root: ['root'],
    docked: [(variant === 'permanent' || variant === 'persistent') && 'docked'],
    modal: ['modal'],
    paper: [
      'paper',
      `paperAnchor${capitalize(anchor)}`,
      variant !== 'temporary' && `paperAnchorDocked${capitalize(anchor)}`,
    ],
  };

  return composeClasses(slots, getDrawerUtilityClass, classes);
};

const Drawer = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      component,
      isOpen,
      onClose,
      zIndex,
      transition = {enter: 500, exit: 500},
      variant,
      anchor = 'right',
      overlayAlpha,
      overlayColor,
      hasBackdrop = false,
      sx,
      className,
      classes: inputClasses,
    }: DrawerProps,
    ref: Ref<T>,
  ) => {
    const [isDrawerShow, setIsDrawerShow] = useState(!!isOpen);
    const sxStyles = useSxProp(sx);

    const ownerState = {
      anchor,
      variant,
      classes: inputClasses,
    };

    const classes = useUtilityClasses(ownerState);

    useLockBody(isDrawerShow);

    useEffect(() => {
      setIsDrawerShow(!!isOpen);
    }, [isOpen]);

    const closeDrawer = useCallback(() => {
      setIsDrawerShow(false);
      onClose && onClose();
    }, [onClose]);

    return (
      <Fade
        in={isDrawerShow}
        transition={{enter: 0, exit: transition.exit}}
        transitionDelay={{enter: 0, exit: transition.exit}}
      >
        <S.Drawer
          as={component}
          ref={ref as Ref<HTMLDivElement>}
          className={clsx(classes.root, classes.modal, className)}
          $isOpen={isDrawerShow}
          $zIndex={zIndex}
          $transition={transition}
          $variant={variant}
          $anchor={anchor}
          $hasBackdrop={hasBackdrop}
          sx={sxStyles}
        >
          {hasBackdrop ? (
            <Backdrop
              onClose={closeDrawer}
              open={!!isDrawerShow}
              overlayColor={overlayColor}
              overlayAlpha={overlayAlpha}
              transition={transition}
            />
          ) : null}
          <Slide
            in={!!isDrawerShow}
            direction={(oppositeDirection as any)[anchor]}
            transition={transition}
          >
            <S.Layout
              $isOpen={!!isDrawerShow}
              $anchor={anchor}
              $zIndex={zIndex as number}
              $hasBackdrop={hasBackdrop}
              className={classes.paper}
            >
              {children}
            </S.Layout>
          </Slide>
        </S.Drawer>
      </Fade>
    );
  },
);
Drawer.displayName = 'Drawer';

export default Drawer;
