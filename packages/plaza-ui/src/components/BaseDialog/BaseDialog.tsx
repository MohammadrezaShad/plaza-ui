/* eslint-disable prettier/prettier */
import {useLockBody} from '@plaza-ui/hooks/lib/useLockBody';
import {canUseDom} from '@plaza-ui/utils/lib/canUseDom';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {createPortal} from 'react-dom';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import Backdrop from '../Backdrop';
import Fade from '../Fade';
import Grow from '../Grow';
import {DialogContext} from './BaseDialog.helpers';
import * as S from './BaseDialog.styled';
import {BaseDialogClasses, getDialogUtilityClass} from './baseDialogClasses';

export type DialogScroll = 'paper' | 'body';

export type BaseDialogProps = {
  children?: ReactNode;
  component?: Component;
  isOpen: boolean;
  onClose: () => void;
  overlayColor?: string;
  overlayAlpha?: number;
  sx?: SxType;
  classes?: Partial<BaseDialogClasses>;
  className?: string;
  scroll?: DialogScroll;
  hasBackdrop?: boolean;
  unmountOnExit?: boolean;
  mountOnEnter?: boolean;
};

const useUtilityClasses = (
  ownerState: Pick<BaseDialogProps, 'isOpen' | 'classes'>,
) => {
  const {classes, isOpen} = ownerState;

  const slots = {
    root: ['root', isOpen && 'open'],
    layout: ['layout'],
    container: ['container'],
    backdrop: ['backdrop'],
  };

  return composeClasses(slots, getDialogUtilityClass, classes);
};

const BaseDialog: FC<BaseDialogProps> = ({
  children,
  component,
  isOpen,
  onClose,
  overlayAlpha,
  overlayColor,
  sx,
  classes: inputClasses,
  className,
  scroll = 'paper',
  hasBackdrop = true,
  unmountOnExit = true,
  mountOnEnter = true,
}) => {
  const ownerState = {
    isOpen,
    classes: inputClasses,
  };

  const classes = useUtilityClasses(ownerState);

  const [isDialogShow, setIsDialogShow] = useState(isOpen);
  const [isLocked, setIsLocked] = useState(isOpen);
  const sxStyles = useSxProp(sx);

  useLockBody(!!isLocked);

  const activeScroll = useCallback(() => {
    const timeoutId = setTimeout(() => {
      setIsLocked(false);
      clearTimeout(timeoutId);
    }, 100);
  }, []);

  useEffect(() => {
    setIsDialogShow(isOpen);
    if (isOpen) {
      setIsLocked(true);
    } else {
      activeScroll();
    }
  }, [activeScroll, isOpen]);

  const closeDialog = useCallback(() => {
    setIsDialogShow(false);
    activeScroll();
    onClose && onClose();
  }, [onClose, activeScroll]);

  const value = useMemo(
    () => ({closeDialog, isDialogShow, setIsDialogShow}),
    [closeDialog, isDialogShow, setIsDialogShow],
  );

  const onContainerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!canUseDom) return null;

  return createPortal(
    <Fade
      in={isDialogShow}
      transition={{enter: 0, exit: 100}}
      transitionDelay={{enter: 0, exit: 100}}
      unmountOnExit={unmountOnExit}
      mountOnEnter={mountOnEnter}
    >
      <S.Root
        as={component}
        className={clsx(classes.root, className)}
        sx={sxStyles}
      >
        {hasBackdrop ? (
          <Backdrop
            onClose={closeDialog}
            open={isDialogShow}
            overlayColor={overlayColor}
            overlayAlpha={overlayAlpha}
            transition={{enter: 500, exit: 500}}
            className={classes.backdrop}
            sx={{zIndex: '-1'}}
          />
        ) : null}

        <S.Layout
          className={classes.layout}
          $scroll={scroll}
          onClick={closeDialog}
        >
          <DialogContext.Provider value={value}>
            <Grow
              in={isDialogShow}
              transition={{enter: 500, exit: 300}}
              unmountOnExit={unmountOnExit}
              mountOnEnter={mountOnEnter}
            >
              <S.Container
                className={classes.container}
                $scroll={scroll}
                onClick={onContainerClick}
              >
                {children}
              </S.Container>
            </Grow>
          </DialogContext.Provider>
        </S.Layout>
      </S.Root>
    </Fade>,

    document.getElementById('dialog') as Element,
  );
};

export default BaseDialog;
