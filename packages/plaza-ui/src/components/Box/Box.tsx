import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, HTMLAttributes, ReactNode, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import * as S from './Box.styled';
import {BoxClasses, getBoxUtilityClass} from './boxClasses';

const useUtilityClasses = (ownerState: Pick<BoxProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getBoxUtilityClass, classes);
};

export type BoxProps<T extends HTMLElement = HTMLDivElement> = {
  children?: ReactNode;
  sx?: SxType;
  component?: Component;
  classes?: Partial<BoxClasses>;
} & HTMLAttributes<T>;

const Box = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      sx,
      component,
      classes: inputClasses,
      className,
      ...otherProps
    }: BoxProps<T>,
    ref: Ref<T>,
  ) => {
    const sxStyles = useSxProp(sx);
    const ownerState = {
      classes: inputClasses,
    };

    const classes = useUtilityClasses(ownerState);
    return (
      <S.Box
        as={component}
        ref={ref as Ref<HTMLDivElement>}
        sx={sxStyles}
        {...otherProps}
        className={clsx(classes.root, className)}
      >
        {children}
      </S.Box>
    );
  },
);
Box.displayName = 'Box';

export default Box;
