import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, useImperativeHandle, useRef} from 'react';

import WithToggleWrap from '../../hoc/withToggleWrap';
import useSxProp from '../../hooks/useSxProp';
import {ToggleProps} from '../../shared/Toggle.types';
import * as S from './Radio.styled';
import {getRadioUtilityClass, RadioClasses} from './radioClasses';

export type RadioProps = {
  classes?: Partial<RadioClasses>;
} & ToggleProps;

const useUtilityClasses = (
  ownerState: Pick<RadioProps, 'classes' | 'disabled' | 'on'>,
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

  return composeClasses(slots, getRadioUtilityClass, classes);
};

const Radio = forwardRef<HTMLInputElement, RadioProps>(
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
    const inputRef = useRef(
      null,
    ) as React.MutableRefObject<HTMLInputElement | null>;
    useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);
    const [on, setOn] = useControlled<boolean | undefined>({
      controlled: controlledOn,
      default: initialOn,
      name: 'Radio',
      state: 'on',
    });

    const ownerState = {
      classes: inputClasses,
      disabled,
      on: controlledOn === undefined ? on : controlledOn,
    };

    const classes = useUtilityClasses(ownerState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) {
        event.preventDefault();
        return;
      }
      if (controlledOn === undefined) {
        setOn(event.target.checked);
      }
      onChange?.(event);
    };
    const disabledOnFocus = () => {
      inputRef.current?.blur();
    };

    const hasInitialOn =
      controlledOn !== undefined || disabled || readOnly
        ? undefined
        : initialOn;
    const hasChecked = disabled || readOnly ? on : controlledOn;

    const sxStyles = useSxProp(sx);

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
          <S.Container $disabled={disabled} className={classes.container}>
            <S.Input
              className={clsx(classes.root, className)}
              checked={hasChecked}
              defaultChecked={hasInitialOn}
              name={name}
              ref={inputRef}
              id={id}
              onChange={handleChange}
              type="radio"
              required={required}
              $disabled={disabled}
              $toggleColor={toggleColor}
              $highlightColor={highlightColor}
              value={value}
              onFocus={disabled ? disabledOnFocus : onFocus}
              onBlur={onBlur}
              onClick={onClick}
              readOnly={readOnly}
              {...props}
            />
            <S.Thumb className={classes.icon} />
            <S.Layout />
          </S.Container>
        </S.Wrap>
        {text ? <S.Text>{text}</S.Text> : null}
        {children}
      </WithToggleWrap>
    );
  },
);

Radio.displayName = 'Radio';
export default Radio;
