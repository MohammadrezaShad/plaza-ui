import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef} from 'react';

import useSxProp from '../../hooks/useSxProp';
import {ReactElement} from '../../shared/Main.types';
import * as S from './Button.styled';
import {ButtonProps} from './Button.types';
import {getButtonUtilityClass} from './buttonClasses';

enum ButtonPosition {
  Start,
  End,
}

const useUtilityClasses = (
  ownerState: Pick<
    ButtonProps,
    'classes' | 'color' | 'size' | 'variant' | 'disabled'
  >,
) => {
  const {variant, color, size, classes, disabled} = ownerState;

  const slots = {
    root: ['root', `${color}`, `${variant}`, `${size}`, disabled && 'disabled'],
    icon: ['icon'],
    startIcon: ['startIcon'],
    endIcon: ['endIcon'],
  };

  return composeClasses(slots, getButtonUtilityClass, classes);
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      component,
      textColor,
      highlightColor,
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      to,
      fullWidth,
      href,
      startIcon,
      endIcon,
      text,
      hasHover = true,
      hasFocus,
      hasActive,
      disabled,
      type,
      onClick,
      noPadding,
      hasDefaultCursor,
      sx,
      className,
      classes: inputClasses,
      ...props
    },
    ref,
  ) => {
    const sxStyles = useSxProp(sx);

    const ownerState = {
      color,
      size,
      variant,
      classes: inputClasses,
      disabled,
    };

    const classes = useUtilityClasses(ownerState);

    const renderIcon = (icon?: ReactElement, position?: number) =>
      icon ? (
        <S.Icon
          $hasChild={!!(children || text)}
          $hasEndIcon={position === ButtonPosition.End}
          $hasStartIcon={position === ButtonPosition.Start}
          className={clsx(
            classes.icon,
            position === ButtonPosition.End
              ? classes.endIcon
              : classes.startIcon,
          )}
        >
          {icon}
        </S.Icon>
      ) : null;

    return (
      <S.Button
        onClick={disabled ? null : onClick}
        className={clsx(classes.root, className)}
        as={component}
        sx={sxStyles}
        ref={ref}
        type={type}
        to={to}
        href={href}
        $size={size}
        $color={color}
        $textColor={textColor}
        $highlightColor={highlightColor}
        $variant={variant}
        $fullWidth={fullWidth}
        $disabled={disabled}
        $hasHover={hasHover}
        $hasFocus={hasFocus}
        $hasActive={hasActive}
        $noPadding={noPadding}
        $hasDefaultCursor={hasDefaultCursor}
        {...props}
      >
        {renderIcon(startIcon, ButtonPosition.Start)}
        {text}
        {children}
        {renderIcon(endIcon, ButtonPosition.End)}
      </S.Button>
    );
  },
);

export default Button;

Button.displayName = 'Button';
