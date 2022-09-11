import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import Danger from '@plaza-ui/icons/lib/Danger';
import Success from '@plaza-ui/icons/lib/Success';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {
  forwardRef,
  MutableRefObject,
  ReactNode,
  TextareaHTMLAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {ReactMouseEvent} from '../../shared';
import Label from '../Label';
import Typography from '../Typography';
import * as S from './TextArea.styled';
import {getTextAreaUtilityClass, TextAreaClasses} from './textAreaClasses';

export interface TextAreaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  rows?: number;
  children?: ReactNode;
  fullWidth?: boolean;
  initialValue?: string;
  label?: string | number;
  error?: boolean;
  success?: boolean;
  value?: string;
  optionalText?: string;
  isOptional?: boolean;
  helperText?: string | number;
  disabled?: boolean;
  required?: boolean;
  icon?: string | JSX.Element;
  onIconClick?: ReactMouseEvent<HTMLInputElement>;
  preventResize?: boolean;
  sx?: SxType;
  classes?: Partial<TextAreaClasses>;
}

const useUtilityClasses = (
  ownerState: Pick<TextAreaProps, 'classes' | 'disabled'>,
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

  return composeClasses(slots, getTextAreaUtilityClass, classes);
};

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (props, ref) => {
    const {
      rows = 4,
      preventResize = true,
      value: controlledValue,
      initialValue = '',
      label,
      helperText,
      optionalText = 'اختیاری',
      isOptional,
      required,
      children,
      fullWidth,
      onFocus,
      icon,
      disabled,
      error,
      success,
      autoFocus,
      id,
      onIconClick,
      onChange,
      readOnly,
      sx,
      className,
      classes: inputClasses,
      ...restProps
    } = props;
    const inputRef = useRef() as MutableRefObject<HTMLTextAreaElement>;
    useImperativeHandle(ref, () => inputRef.current);
    const sxStyles = useSxProp(sx);

    const ownerState = {
      classes: inputClasses,
      disabled,
    };

    const classes = useUtilityClasses(ownerState);

    const [fieldValue, setFieldValue] = useControlled<string | undefined>({
      controlled: controlledValue,
      default: initialValue,
      name: 'TextArea',
      state: 'value',
    });

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (readOnly || disabled) return;
      if (controlledValue === undefined) {
        setFieldValue(event.target.value);
      }
      onChange?.(event);
    };

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
            className={classes.icon}
            onClick={onIconClick}
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
            className={classes.icon}
            component={S.StatusIcon}
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
        <S.Wrap $disabled={disabled} sx={sxStyles}>
          <S.TextArea
            className={clsx(classes.root, className)}
            rows={rows}
            id={id}
            onFocus={disabled ? disabledOnFocus : onFocus}
            onChange={handleChange}
            value={fieldValue}
            ref={inputRef}
            readOnly={readOnly}
            required={required}
            $error={error}
            $disabled={disabled}
            $icon={icon}
            $fullWidth={fullWidth}
            $success={success}
            $preventResize={preventResize}
            {...restProps}
          />
          {icon || error || success ? (
            <S.IconWrap onClick={onIconClick}>
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

TextArea.displayName = 'TextArea';

export default React.memo(TextArea);
