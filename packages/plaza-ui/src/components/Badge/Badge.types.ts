import {DefaultColor} from '@plaza-ui/styles/lib/createColors';
import {ReactNode} from 'react';
import {CSSObject, DefaultTheme} from 'styled-components';

import {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import {BadgeClasses} from './badgeClasses';

export type BadgeVariant = 'contained' | 'outlined' | 'text';
export type BadgeSize = 'small' | 'normal' | 'large';
export type BadgeColor = DefaultColor | 'dark' | 'strokeVariant';

export type BadgeProps = {
  children?: ReactNode;
  component?: Component;
  variant?: BadgeVariant;
  size?: BadgeSize;
  text?: string | number;
  color?: BadgeColor;
  sx?: SxType;
  className?: string;
  classes?: Partial<BadgeClasses>;
};

type BadgeDefaultProps = Omit<
  BadgeProps,
  'children' | 'component' | 'text' | 'sx'
>;

export type BadgeStyledProps = {
  [Property in keyof BadgeDefaultProps as `$${Property}`]-?: BadgeDefaultProps[Property];
} & {sx?: CSSObject};

export type BadgeStyledThemeProps = BadgeStyledProps & {theme: DefaultTheme};
