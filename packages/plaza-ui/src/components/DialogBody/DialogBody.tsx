import {MainColor} from '@plaza-ui/styles/lib/createColors';
import {Radius} from '@plaza-ui/styles/lib/createRadiuses';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import * as S from './DialogBody.styled';
import {
  DialogBodyClasses,
  getDialogBodyUtilityClass,
} from './dialogBodyClasses';

type DialogBodyRadius = keyof Radius;

export type DialogBodyProps = {
  children?: ReactNode;
  component?: Component;
  padding?: number;
  radius?: DialogBodyRadius;
  backgroundColor?: MainColor;
  sx?: SxType;
  classes?: Partial<DialogBodyClasses>;
  className?: string;
};

export type DialogBodyStylesProps = Omit<
  DialogBodyProps,
  'children' | 'component' | 'sx'
>;

const useUtilityClasses = (ownerState: Pick<DialogBodyProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getDialogBodyUtilityClass, classes);
};

const DialogBody = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      component,
      padding,
      radius,
      backgroundColor,
      sx,
      className,
      classes: inputClasses,
    }: DialogBodyProps,
    ref: Ref<T>,
  ) => {
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({classes: inputClasses});
    return (
      <S.Wrapper
        className={clsx(classes.root, className)}
        as={component}
        ref={ref}
        $padding={padding}
        $radius={radius}
        $backgroundColor={backgroundColor}
        sx={sxStyles}
      >
        {children}
      </S.Wrapper>
    );
  },
);

DialogBody.displayName = 'DialogBody';

export default DialogBody;
