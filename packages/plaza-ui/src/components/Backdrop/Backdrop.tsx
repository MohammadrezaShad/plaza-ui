import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component, ReactMouseEvent} from '../../shared';
import Fade from '../Fade';
import * as S from './Backdrop.styled';
import {BackdropClasses, getBackdropUtilityClass} from './backdropClasses';

export interface BackdropTransition {
  enter: number;
  exit: number;
}

export type BackdropProps = {
  children?: ReactNode;
  component?: Component;
  open: boolean;
  onClose?: ReactMouseEvent<Element>;
  zIndex?: number;
  transition?: BackdropTransition;
  overlayColor?: string;
  overlayAlpha?: number;
  sx?: SxType;
  className?: string;
  classes?: Partial<BackdropClasses>;
};

const useUtilityClasses = (ownerState: Pick<BackdropProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getBackdropUtilityClass, classes);
};

const Backdrop = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      component,
      open,
      onClose,
      zIndex,
      transition,
      overlayColor,
      overlayAlpha,
      sx,
      className,
      classes: inputClasses,
    }: BackdropProps,
    ref: Ref<T>,
  ) => {
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({
      classes: inputClasses,
    });

    return (
      <Fade in={open}>
        <S.Backdrop
          as={component}
          ref={ref as Ref<HTMLDivElement>}
          className={clsx(classes.root, className)}
          sx={sxStyles}
          onClick={onClose}
          $open={open}
          $zIndex={zIndex}
          $transition={transition}
          $overlayColor={overlayColor}
          $overlayAlpha={overlayAlpha}
        >
          {children}
        </S.Backdrop>
      </Fade>
    );
  },
);
Backdrop.displayName = 'Backdrop';

export default Backdrop;
