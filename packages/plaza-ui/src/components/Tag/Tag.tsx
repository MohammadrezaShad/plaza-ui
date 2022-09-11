import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {FC} from 'react';

import useSxProp from '../../hooks/useSxProp';
import capitalize from '../../utils/capitalize';
import * as S from './Tag.styled';
import {TagProps} from './Tag.types';
import {getTagUtilityClass} from './tagClasses';

const useUtilityClasses = (
  ownerState: Pick<TagProps, 'classes' | 'color' | 'size' | 'variant'>,
) => {
  const {variant, color, size, classes} = ownerState;

  const slots = {
    root: ['root', `${variant}${capitalize(color)}`, `${variant}`, `${size}`],
  };

  return composeClasses(slots, getTagUtilityClass, classes);
};

const Tag: FC<TagProps> = ({
  children,
  text,
  component,
  color = 'primary',
  size = 'normal',
  variant = 'contained',
  sx,
  className,
  classes: inputClasses,
  ...otherProps
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
    <S.Tag
      className={clsx(classes.root, className)}
      as={component}
      $color={color}
      $size={size}
      $variant={variant}
      sx={sxStyles}
      {...otherProps}
    >
      {text}
      {children}
    </S.Tag>
  );
};

export default Tag;
