import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import Danger from '@plaza-ui/icons/lib/Danger';
import Success from '@plaza-ui/icons/lib/Success';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {
  forwardRef,
  MutableRefObject,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import useSxProp from '../../hooks/useSxProp';
import {FieldProps} from '../../shared/Field.types';
import Label from '../Label';
import Typography from '../Typography';
import * as S from './Field.styled';
import {getFieldUtilityClass} from './fieldClasses';

const useUtilityClasses = (
  ownerState: Pick<FieldProps, 'classes' | 'disabled'>,
) => {
  const {classes, disabled} = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled'],
    icon: ['icon'],
    wrap: ['wrap'],
    label: ['label'],
    tag: ['tag'],
    helper: ['helper'],
    head: ['head'],
  };
  return composeClasses(slots, getFieldUtilityClass, classes);
};

const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      onChange,
      onFocus,
      onBlur,
      onClick,
      autoComplete,
      autoFocus,
      children,
      initialValue = '',
      disabled,
      error,
      fullWidth,
      label,
      required,
      type,
      placeholder,
      value: controlledValue,
      icon,
      onIconClick,
      variant = 'standard',
      size = 'medium',
      helperText,
      id,
      readOnly,
      success,
      isOptional,
      optionalText = 'اختیاری',
      name,
      sx,
      className,
      classes: inputClasses,
      ...props
    },
    ref,
  ) => {
    const [fieldValue, setFieldValue] = useControlled<string | undefined>({
      controlled: controlledValue,
      default: initialValue,
      name: 'Field',
      state: 'value',
    });

    const sxStyles = useSxProp(sx);
    const ownerState = {
      classes: inputClasses,
      disabled,
    };

    const classes = useUtilityClasses(ownerState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (readOnly || disabled) return;
      if (controlledValue === undefined) {
        setFieldValue(event.target.value);
      }
      onChange?.(event);
    };

    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    useImperativeHandle(ref, () => inputRef.current);

    const renderHelper = () => {
      const helperType = typeof helperText;
      if (['string', 'number'].includes(helperType)) {
        return (
          <S.Help className={classes.helper} $error={error} $success={success}>
            {helperText}
          </S.Help>
        );
      }
      if (helperText) {
        return helperText;
      }
      return null;
    };

    const renderLabel = () => {
      const labelType = typeof label;
      if (['string', 'number'].includes(labelType)) {
        return (
          <Label className={classes.label} component={S.Label} htmlFor={id}>
            {label}
          </Label>
        );
      }
      if (label) {
        return label;
      }
      return null;
    };

    const renderOptionalTag = () => {
      if (isOptional) {
        return (
          <Typography
            component={S.Optional}
            variant="overline"
            color="textSecondary"
            className={classes.tag}
          >
            {optionalText}
          </Typography>
        );
      }
    };

    const renderIcon = () => {
      if (icon) {
        return (
          <S.Icon
            onClick={onIconClick}
            className={classes.icon}
            $disabled={disabled}
          >
            {icon}
          </S.Icon>
        );
      }
      return null;
    };

    const renderStatusIcon = () => {
      if (error)
        return (
          <Danger
            component={S.StatusIcon}
            className={classes.icon}
            size={20}
            color="danger"
          />
        );

      if (success)
        return (
          <Success
            className={classes.icon}
            component={S.StatusIcon}
            size={20}
            color="success"
          />
        );
    };

    const disabledOnFocus = () => {
      inputRef.current.blur();
    };

    useEffect(() => {
      if (autoFocus && !disabled) {
        inputRef.current.focus();
      }
    }, [autoFocus, disabled]);

    return (
      <>
        {label || isOptional ? (
          <S.Head className={classes.head}>
            {renderLabel()}
            {renderOptionalTag()}
          </S.Head>
        ) : null}
        <S.Wrap className={classes.wrap} $disabled={disabled} sx={sxStyles}>
          <S.Field
            className={clsx(classes.root, className)}
            id={id}
            placeholder={placeholder}
            type={type}
            name={name}
            onFocus={disabled ? disabledOnFocus : onFocus}
            onBlur={onBlur}
            onClick={onClick}
            required={required}
            autoComplete={autoComplete}
            onChange={handleChange}
            value={fieldValue}
            ref={inputRef}
            $error={error}
            $disabled={disabled}
            $icon={!!icon}
            $fullWidth={fullWidth}
            $variant={variant}
            $size={size}
            $success={success}
            readOnly={readOnly}
            {...props}
          />
          {icon || error || success ? (
            <S.IconWrap>
              {renderIcon()}
              {renderStatusIcon()}
            </S.IconWrap>
          ) : null}
        </S.Wrap>
        {renderHelper()}
        {children}
      </>
    );
  },
);

export default Field;

Field.displayName = 'Field';
