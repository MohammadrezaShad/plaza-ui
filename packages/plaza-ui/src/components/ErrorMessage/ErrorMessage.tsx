import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode} from 'react';

import {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import Typography from '../Typography';
import {
  ErrorMessageClasses,
  getErrorMessageUtilityClass,
} from './errorMessageClasses';

export type ErrorMessageProps = {
  children?: ReactNode;
  component?: Component;
  gutter?: number;
  gutterBottom?: number;
  gutterTop?: number;
  gutterRight?: number;
  gutterLeft?: number;
  sx?: SxType;
  className?: string;
  classes?: Partial<ErrorMessageClasses>;
};

const useUtilityClasses = (ownerState: Pick<ErrorMessageProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getErrorMessageUtilityClass, classes);
};

const ErrorMessage = forwardRef<HTMLElement, ErrorMessageProps>(
  (
    {
      children,
      component,
      gutter,
      gutterTop,
      gutterBottom,
      gutterRight,
      gutterLeft,
      sx,
      className,
      classes: inputClasses,
    },
    ref,
  ) => {
    const classes = useUtilityClasses({classes: inputClasses});

    return (
      <Typography
        className={clsx(classes.root, className)}
        ref={ref}
        color="danger"
        variant="overline"
        component={component}
        gutter={gutter}
        gutterTop={gutterTop}
        gutterBottom={gutterBottom}
        gutterRight={gutterRight}
        gutterLeft={gutterLeft}
        sx={sx}
      >
        {children}
      </Typography>
    );
  },
);
ErrorMessage.displayName = 'ErrorMessage';

export default ErrorMessage;
