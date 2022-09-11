import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {FC} from 'react';

import useSxProp from '../../hooks/useSxProp';
import capitalize from '../../utils/capitalize';
import * as S from './Badge.styled';
import {BadgeProps} from './Badge.types';
import {getBadgeUtilityClass} from './badgeClasses';

const useUtilityClasses = (
  ownerState: Pick<BadgeProps, 'classes' | 'color' | 'size' | 'variant'>,
) => {
  const {variant, color, size, classes} = ownerState;

  const slots = {
    root: ['root', `${variant}${capitalize(color)}`, `${variant}`, `${size}`],
  };

  return composeClasses(slots, getBadgeUtilityClass, classes);
};

const Badge: FC<BadgeProps> = ({
  children,
  component,
  size = 'normal',
  variant = 'contained',
  color = 'primary',
  text,
  sx,
  className,
  classes: inputClasses,
}) => {
  const sxStyles = useSxProp(sx);

  const ownerState = {
    color,
    size,
    variant,
    classes: inputClasses,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <S.Badge
      as={component}
      className={clsx(classes.root, className)}
      $size={size}
      $variant={variant}
      $color={color}
      sx={sxStyles}
    >
      {text}
      {children}
    </S.Badge>
  );
};

export default Badge;
