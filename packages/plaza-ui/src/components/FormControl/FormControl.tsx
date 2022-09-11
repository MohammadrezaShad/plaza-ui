import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import * as S from './FormControl.styled';
import {
  FormControlClasses,
  getFormControlUtilityClass,
} from './formControlClasses';

type FormControlProps = {
  children?: ReactNode;
  component?: Component;
  gutterBottom?: number;
  sx?: SxType;
  className?: string;
  classes?: Partial<FormControlClasses>;
};

const useUtilityClasses = (ownerState: Pick<FormControlProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getFormControlUtilityClass, classes);
};

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  (
    {children, component, gutterBottom, sx, classes: inputClasses, className},
    ref,
  ) => {
    const sxStlyes = useSxProp(sx);

    const ownerState = {
      classes: inputClasses,
    };

    const classes = useUtilityClasses(ownerState);

    return (
      <S.FormControl
        className={clsx(classes.root, className)}
        as={component}
        ref={ref}
        gutterBottom={gutterBottom}
        sx={sxStlyes}
      >
        {children}
      </S.FormControl>
    );
  },
);
FormControl.displayName = 'FormControl';
export default FormControl;
