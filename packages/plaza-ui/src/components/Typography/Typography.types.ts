import {DefaultColor} from '@plaza-ui/styles/lib/createColors';
import {VariantNames} from '@plaza-ui/styles/lib/createTypography';
import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import {ReactNode} from 'react';
import {CSSObject} from 'styled-components';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import {TypographyClasses} from './typographyClasses';

export type TypographyAlign =
  | 'inherit'
  | 'left'
  | 'center'
  | 'right'
  | 'justify';

export type TypographyUnderline = 'none' | 'hover' | 'always';

export type TypeographyVariantMapping = {
  [key in VariantNames]: string;
};

export type TypographyDisplay =
  | 'initial'
  | 'block'
  | 'inline'
  | 'flex'
  | 'inline-flex';

export type TypographyProps<T = HTMLDivElement> = {
  children?: ReactNode;
  align?: TypographyAlign;
  color?: DefaultColor;
  component?: Component;
  variant?: VariantNames;
  variantMapping?: TypeographyVariantMapping;
  noWrap?: boolean;
  display?: TypographyDisplay;
  paragraph?: boolean;
  gutter?: number;
  gutterBottom?: number;
  gutterTop?: number;
  gutterRight?: number;
  gutterLeft?: number;
  text?: string | number | symbol;
  ellipsisTextOverflow?: boolean;
  to?: string;
  href?: string;
  htmlFor?: string;
  id?: string;
  className?: string;
  underline?: TypographyUnderline;
  sx?: SxType;
  rel?: HTMLAnchorElement['rel'];
  classes?: Partial<TypographyClasses>;
} & React.HTMLAttributes<T>;

export type TypographyStyledProps = {
  $align?: TypographyAlign;
  $color: DefaultColor;
  $variant: VariantNames;
  $noWrap?: boolean;
  $display?: TypographyDisplay;
  $paragraph?: boolean;
  $gutter?: number;
  $gutterBottom?: number;
  $gutterTop?: number;
  $gutterRight?: number;
  $gutterLeft?: number;
  $ellipsisTextOverflow?: boolean;
  $underline: TypographyUnderline;
  sx?: CSSObject;
};

export type SetTypographyGutter = {
  theme: DefaultTheme;
  $gutter?: number;
  $gutterBottom?: number;
  $gutterTop?: number;
  $gutterRight?: number;
  $gutterLeft?: number;
  $paragraph?: boolean;
};
