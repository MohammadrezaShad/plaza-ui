import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import Tick from '@plaza-ui/icons/lib/Tick';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';

import WithToggleWrap from '../../hoc/withToggleWrap';
import useSxProp from '../../hooks/useSxProp';
import {ToggleProps} from '../../shared/Toggle.types';
import * as S from './Checkbox.styled';
import {CheckboxClasses, getCheckboxUtilityClass} from './checkboxClasses';

export type CheckboxProps = {
  icon?: 'icon-indeterminate' | 'icon-tick';
  classes?: Partial<CheckboxClasses>;
} & ToggleProps;

const useUtilityClasses = (
  ownerState: Pick<CheckboxProps, 'classes' | 'disabled' | 'on'>,
) => {
  const {classes, disabled, on} = ownerState;

  const slots = {
    root: ['root', on && 'checked', disabled && 'disabled'],
    icon: ['icon'],
    wrap: ['wrap'],
    container: ['container'],
    text: ['text'],
    layout: ['layout'],
  };

  return composeClasses(slots, getCheckboxUtilityClass, classes);
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      on: controlledOn,
      onChange,
      onFocus,
      onBlur,
      onClick,
      initialOn = false,
      direction,
      text,
      children,
      disabled,
      required,
      id,
      hasHover = true,
      hasFocus,
      name,
      icon = 'icon-tick',
      toggleColor = 'primary',
      highlightColor,
      value,
      readOnly,
      sx,
      classes: inputClasses,
      className,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
    useImperativeHandle(ref, () => inputRef.current);
    const [on, setOn] = useControlled<boolean | undefined>({
      controlled: controlledOn,
      default: initialOn,
      name: 'Checkbox',
      state: 'on',
    });
    const sxStyles = useSxProp(sx);

    const ownerState = {
      classes: inputClasses,
      disabled,
      on: controlledOn === undefined ? on : controlledOn,
    };

    const classes = useUtilityClasses(ownerState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) return;
      if (controlledOn === undefined) {
        setOn(event.target.checked);
      }
      onChange?.(event);
    };
    const disabledOnFocus = () => {
      inputRef.current.blur();
    };
    return (
      <WithToggleWrap
        subChildren={children}
        text={text}
        direction={direction}
        disabled={disabled}
      >
        <S.Wrap
          className={classes.wrap}
          $disabled={disabled}
          $hasHover={hasHover}
          $hasFocus={hasFocus}
          $toggleColor={toggleColor}
          $highlightColor={highlightColor}
          sx={sxStyles}
        >
          <S.Container className={classes.container} $disabled={disabled}>
            {icon !== 'icon-tick' ? (
              <S.Icon as={Tick} size={12} $on={on} className={classes.icon} />
            ) : (
              <S.Tick $on={on} className={classes.icon}>
                <polyline points="1 5 4 8 11 1" />
              </S.Tick>
            )}

            <S.Input
              className={clsx(classes.root, className)}
              checked={on}
              name={name}
              ref={ref}
              id={id}
              onChange={handleChange}
              onFocus={disabled ? disabledOnFocus : onFocus}
              onBlur={onBlur}
              onClick={onClick}
              type="checkbox"
              required={required}
              $disabled={disabled}
              value={value}
              readOnly={readOnly}
              {...props}
            />
            <S.Layout
              $on={on}
              $toggleColor={toggleColor}
              $highlightColor={highlightColor}
            />
          </S.Container>
        </S.Wrap>
        {text ? <S.Text $disabled={disabled}>{text}</S.Text> : null}
        {children}
      </WithToggleWrap>
    );
  },
);

export default Checkbox;
Checkbox.displayName = 'Checkbox';
