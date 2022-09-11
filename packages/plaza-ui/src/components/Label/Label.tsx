import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {FC, forwardRef, ReactNode} from 'react';

import {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import Typography from '../Typography';
import {getLabelUtilityClass, LabelClasses} from './labelClasses';

export type LabelProps = {
  children?: ReactNode;
  component?: Component;
  gutter?: number;
  gutterBottom?: number;
  gutterTop?: number;
  gutterRight?: number;
  gutterLeft?: number;
  htmlFor?: string;
  id?: string;
  className?: string;
  sx?: SxType;
  classes?: Partial<LabelClasses>;
};

const useUtilityClasses = (ownerState: Pick<LabelProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getLabelUtilityClass, classes);
};

const Label: FC<LabelProps> = forwardRef<HTMLLabelElement, LabelProps>(
  (
    {
      children,
      component = 'label',
      gutter,
      gutterTop,
      gutterBottom,
      gutterRight,
      gutterLeft,
      htmlFor,
      id,
      className,
      classes: inputClasses,
      ...props
    },
    ref,
  ) => {
    const ownerState = {
      classes: inputClasses,
    };
    const classes = useUtilityClasses(ownerState);

    return (
      <Typography
        component={component}
        htmlFor={htmlFor}
        id={id}
        className={clsx(classes.root, className)}
        ref={ref}
        color="textPrimary"
        variant="body1"
        gutter={gutter}
        gutterTop={gutterTop}
        gutterBottom={gutterBottom}
        gutterRight={gutterRight}
        gutterLeft={gutterLeft}
        {...props}
      >
        {children}
      </Typography>
    );
  },
);

Label.displayName = 'Label';

export default Label;
