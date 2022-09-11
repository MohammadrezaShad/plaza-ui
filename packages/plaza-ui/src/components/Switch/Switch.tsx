import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';

import WithToggleWrap from '../../hoc/withToggleWrap';
import useSxProp from '../../hooks/useSxProp';
import {ToggleProps} from '../../shared/Toggle.types';
import * as S from './Switch.styled';
import {getSwitchUtilityClass, SwitchClasses} from './switchClasses';

export type SwitchProps = {
  classes?: Partial<SwitchClasses>;
} & ToggleProps;

const useUtilityClasses = (
  ownerState: Pick<SwitchProps, 'classes' | 'disabled' | 'on'>,
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

  return composeClasses(slots, getSwitchUtilityClass, classes);
};

const Switch = forwardRef<HTMLInputElement, SwitchProps>(
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

    const ownerState = {
      classes: inputClasses,
      disabled,
      on: controlledOn === undefined ? on : controlledOn,
    };

    const classes = useUtilityClasses(ownerState);

    const sxStyles = useSxProp(sx);

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
            <S.Thumb $on={on} className={classes.icon} />
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
            <S.Track
              $on={on}
              $toggleColor={toggleColor}
              $highlightColor={highlightColor}
            />
          </S.Container>
        </S.Wrap>
        {text ? <S.Text>{text}</S.Text> : null}
        {children}
      </WithToggleWrap>
    );
  },
);
export default Switch;
