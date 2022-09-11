/* eslint-disable @typescript-eslint/no-empty-function */
import Delete from '@plaza-ui/icons/lib/Close';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {FC} from 'react';

import useSxProp from '../../hooks/useSxProp';
import * as S from './Chip.styled';
import {ChipProps} from './Chip.types';
import {getChipUtilityClass} from './chipClasses';

const useUtilityClasses = (
  ownerState: Pick<ChipProps, 'classes' | 'color' | 'size' | 'variant'>,
) => {
  const {variant, color, size, classes} = ownerState;

  const slots = {
    root: ['root', `${color}`, `${variant}`, `${size}`],
    icon: ['icon'],
    label: ['label'],
  };

  return composeClasses(slots, getChipUtilityClass, classes);
};

const Chip: FC<ChipProps> = ({
  children,
  clickable = true,
  component,
  label,
  onClick,
  onDelete,
  deleteIcon,
  avatar,
  icon,
  disabled,
  color = 'primary',
  size = 'medium',
  variant = 'contained',
  sx,
  classes: inputClasses,
  className,
}) => {
  const sxStyles = useSxProp(sx);

  const ownerState = {
    color,
    size,
    variant,
    classes: inputClasses,
  };

  const classes = useUtilityClasses(ownerState);

  const renderDeleteIcon = () => {
    if (deleteIcon)
      return (
        <S.Delete
          className={classes.icon}
          $size={size}
          onClick={disabled ? undefined : onDelete}
        >
          {deleteIcon}
        </S.Delete>
      );
    if (onDelete) {
      return (
        <Delete
          component={S.DeleteIcon}
          size={size === 'small' ? 16 : 18}
          onClick={disabled ? undefined : onDelete}
          className={classes.icon}
        />
      );
    }
    return null;
  };
  const emptyOnClick = () => {};

  return (
    <S.Chip
      as={component}
      className={clsx(classes.root, className)}
      onClick={clickable && !disabled ? onClick || emptyOnClick : undefined}
      $color={color}
      $size={size}
      $variant={variant}
      $disabled={disabled}
      $clickable={clickable}
      sx={sxStyles}
    >
      {avatar || icon ? (
        <S.Icon className={classes.icon} $size={size}>
          {avatar || icon}
        </S.Icon>
      ) : null}
      <S.Label className={classes.label}>{label}</S.Label>
      {children}
      {renderDeleteIcon()}
    </S.Chip>
  );
};

export default Chip;
