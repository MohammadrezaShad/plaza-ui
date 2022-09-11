import {DefaultColor} from '@plaza-ui/styles/lib/createColors';
import {HTMLAttributes, ReactNode} from 'react';
import {CSSObject, DefaultTheme} from 'styled-components';

import {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import {TagClasses} from './tagClasses';

export type TagVariant = 'contained' | 'outlined' | 'text';
export type TagSize = 'small' | 'normal' | 'large';
export type TagColor = DefaultColor | 'dark' | 'strokeVariant';

export type TagMainProps = {
  size?: TagSize;
  variant?: TagVariant;
  color?: TagColor;
  text?: string | number;
  children?: ReactNode;
  component?: Component;
  sx?: SxType;
  classes?: Partial<TagClasses>;
  className?: string;
};

export type TagProps = TagMainProps & HTMLAttributes<HTMLElement>;

type TagDefaultProps = Omit<
  TagMainProps,
  'children' | 'component' | 'text' | 'sx'
>;

export type TagStyledProps = {
  [Property in keyof TagDefaultProps as `$${Property}`]-?: TagDefaultProps[Property];
} & {sx?: CSSObject};

export type TagStyledThemeProps = TagStyledProps & {theme: DefaultTheme};
