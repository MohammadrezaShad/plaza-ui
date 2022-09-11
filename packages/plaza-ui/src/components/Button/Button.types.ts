import {DefaultColor} from '@plaza-ui/styles/lib/createColors';
import {ElementType, ReactNode} from 'react';
import {CSSObject, DefaultTheme} from 'styled-components';

import {SxType} from '../../hooks/useSxProp';
import {
  Component,
  ReactElement,
  ReactMouseEvent,
} from '../../shared/Main.types';
import {ButtonClasses} from './buttonClasses';

export type ButtonVariant = 'contained' | 'outlined' | 'text';
export type ButtonColor = DefaultColor | 'link';
export type ButtonSize = 'small' | 'medium' | 'large';

export type ButtonProps = {
  children?: ReactNode;
  component?: Component;
  variant?: ButtonVariant;
  color?: ButtonColor;
  textColor?: string;
  highlightColor?: string;
  size?: ButtonSize;
  fullWidth?: boolean;
  to?: string;
  href?: string;
  type?: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  text?: ReactNode | string | number;
  hasHover?: boolean;
  hasFocus?: boolean;
  hasActive?: boolean;
  disabled?: boolean;
  onClick?: ReactMouseEvent<Element>;
  noPadding?: boolean;
  hasDefaultCursor?: boolean;
  sx?: SxType;
  className?: string;
  classes?: Partial<ButtonClasses>;
};

export type ButtonStyledProps = {
  $variant?: ButtonVariant;
  $color: ButtonColor;
  $textColor?: string;
  $highlightColor?: string;
  $size?: ButtonSize;
  $fullWidth?: boolean;
  $hasHover?: boolean;
  $hasFocus?: boolean;
  $hasActive?: boolean;
  $disabled?: boolean;
  $noPadding?: boolean;
  $hasDefaultCursor?: boolean;
  sx?: CSSObject;
};

export type ButtonStyledMethodProps = {
  theme: DefaultTheme;
  hasDefaultCursor?: boolean;
} & ButtonStyledProps;

export type ActionStyle = {
  color: string;
  textColor?: string;
  highlightColor?: string;
  theme: DefaultTheme;
};

export type RenderIcon = {
  icon?: string | ElementType | JSX.Element;
  hasStartIcon: boolean;
  hasEndIcon: boolean;
};
