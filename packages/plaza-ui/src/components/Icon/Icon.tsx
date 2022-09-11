import {DefaultColor} from '@plaza-ui/styles/lib/createColors';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import * as S from './Icon.styled';
import {getIconUtilityClass, IconClasses} from './iconClasses';

type Component = React.ElementType | keyof JSX.IntrinsicElements;
export type IconColor = DefaultColor | 'currentColor';

export type IconProps = {
  children?: ReactNode;
  component?: Component;
  className?: string;
  viewBox?: string;
  title?: string;
  color?: IconColor;
  size?: IconSize;
  sx?: SxType;
  classes?: Partial<IconClasses>;
} & Omit<React.HTMLAttributes<SVGElement>, 'children'>;

export type IconSize = number | 'auto';

const useUtilityClasses = (ownerState: Pick<IconProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getIconUtilityClass, classes);
};

const Icon = forwardRef<SVGSVGElement | null, IconProps>((props, ref) => {
  const {
    children,
    className,
    color = 'textPrimary',
    title,
    viewBox = '0 0 24 24',
    size = 'auto',
    component,
    sx,
    classes: inputClasses,
    ...otherProps
  } = props;
  const sxStyles = useSxProp(sx);
  const classes = useUtilityClasses({classes: inputClasses});
  return (
    <S.Svg
      as={component}
      viewBox={viewBox}
      className={clsx(classes.root, className)}
      ref={ref}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      focusable="false"
      $color={color}
      $size={size}
      sx={sxStyles}
      {...otherProps}
    >
      {title && <title>{title}</title>}
      {children}
    </S.Svg>
  );
});
Icon.displayName = 'Icon';

export default Icon;
