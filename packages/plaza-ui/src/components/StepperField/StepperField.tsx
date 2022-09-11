import Typography from '@plaza-ui/core/lib/components/Typography';
import {Component} from '@plaza-ui/core/lib/shared';
import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import ChevronDown from '@plaza-ui/icons/lib/ChevronDown';
import ChevronUp from '@plaza-ui/icons/lib/ChevronTop';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode, Ref, useEffect} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {TypographyProps} from '../Typography/Typography.types';
import * as S from './StepperField.styled';
import {
  getStepperFieldUtilityClass,
  StepperFieldClasses,
} from './stepperFieldClasses';

type StepperProps<T extends HTMLElement = HTMLDivElement> = {
  children?: ReactNode;
  component?: Component;
  actionComponent?: Component;
  value?: number;
  defaultValue?: number;
  onChange?: (newValue: number) => void;
  step?: number;
  incrementIcon?: React.ReactNode;
  decrementIcon?: React.ReactNode;
  typographyProps?: TypographyProps;
  min?: number;
  max?: number;
  isDisabled?: boolean;
  readOnly?: boolean;
  sx?: SxType;
  classes?: Partial<StepperFieldClasses>;
} & React.HTMLAttributes<T>;

const useUtilityClasses = (ownerState: Pick<StepperProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getStepperFieldUtilityClass, classes);
};

const Stepper = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    props: StepperProps<T>,
    ref: Ref<T>,
  ) => {
    const {
      children,
      component,
      actionComponent,
      value: valueProp,
      defaultValue = 0,
      incrementIcon = <ChevronUp />,
      decrementIcon = <ChevronDown />,
      typographyProps = {},
      onChange,
      step = 1,
      min,
      max,
      isDisabled,
      readOnly,
      sx,
      className,
      classes: inputClasses,
      ...otherProps
    } = props;

    const classes = useUtilityClasses({classes: inputClasses});

    const {
      variant = 'body2',
      dir = 'ltr',
      component: typographyComponent = S.Typography,
      ...otherTypographyProps
    } = typographyProps as TypographyProps;
    const sxStyles = useSxProp(sx);
    const [value, setValue] = useControlled({
      controlled: valueProp,
      default: defaultValue,
      name: 'Stepper',
      state: 'value',
    });

    const hasMin = typeof min === 'number';
    const hasMax = typeof max === 'number';
    const isValidValue = hasMin && hasMax && (value < min || value > max);
    const isIncrementDisabled = hasMax ? value >= (max as number) : false;
    const isDecrementDisabled = hasMin ? value <= (min as number) : false;
    const isStepperDisabled = readOnly || isDisabled;

    const handleIncrement = React.useCallback(() => {
      if (isIncrementDisabled || isStepperDisabled) return;
      const newValue = hasMax && value + step < max ? max : value + step;
      setValue(newValue);
      onChange?.(newValue);
    }, [
      isIncrementDisabled,
      isStepperDisabled,
      hasMax,
      value,
      step,
      max,
      setValue,
      onChange,
    ]);

    const handleDecrement = React.useCallback(() => {
      if (isDecrementDisabled || isStepperDisabled) return;
      const newValue = hasMin && value - step < min ? min : value - step;
      setValue(newValue);
      onChange?.(newValue);
    }, [
      isDecrementDisabled,
      isStepperDisabled,
      hasMin,
      value,
      step,
      min,
      setValue,
      onChange,
    ]);

    useEffect(() => {
      if (isValidValue)
        // eslint-disable-next-line no-console
        console.error(
          [
            '[Plaza-UI] : The `value` provided to the Stepper component is invalid.',
          ].join('\n'),
        );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
      <S.Stepper
        className={clsx(classes.root, className)}
        as={component}
        sx={sxStyles}
        ref={ref}
        {...otherProps}
      >
        <S.ActionButton
          as={actionComponent}
          $isDisabled={isIncrementDisabled}
          onClick={handleIncrement}
          role="button"
        >
          {incrementIcon}
        </S.ActionButton>
        <Typography
          component={typographyComponent}
          variant={variant}
          dir={dir}
          {...otherTypographyProps}
        >
          {value}
        </Typography>
        <S.ActionButton
          as={actionComponent}
          $isDisabled={isDecrementDisabled}
          onClick={handleDecrement}
          role="button"
        >
          {decrementIcon}
        </S.ActionButton>
        {children}
      </S.Stepper>
    );
  },
);

Stepper.displayName = 'Stepper';

export default Stepper;
