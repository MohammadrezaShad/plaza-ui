import {DefaultColor} from '@plaza-ui/styles/lib/createColors';
import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import {ReactText} from 'react';
import {CSSObject} from 'styled-components';

import {SxType} from '../../hooks/useSxProp';
import {
  Component,
  ReactElement,
  ReactMouseEvent,
} from '../../shared/Main.types';
import {ChipClasses} from './chipClasses';

export type ChipVariant = 'contained' | 'outlined' | 'pill';
export type ChipSize = 'medium' | 'small';
export type ChipColor = DefaultColor;

export type ChipProps = {
  variant?: ChipVariant;
  size?: ChipSize;
  color?: ChipColor;
  avatar?: ReactElement;
  component?: Component;
  deleteIcon?: ReactElement;
  disabled?: boolean;
  icon?: ReactElement;
  onDelete?: () => void;
  onClick?: ReactMouseEvent<HTMLElement>;
  clickable?: boolean;
  label?: ReactText | ReactElement;
  sx?: SxType;
  classes?: Partial<ChipClasses>;
  className?: string;
};

export type ChipStyledProps = {
  $color: ChipColor;
  $size: ChipSize;
  $variant: ChipVariant;
  $disabled?: boolean;
  $clickable?: boolean;
  sx?: CSSObject;
};

export type ChipStyledMethodProps = {
  theme: DefaultTheme;
} & ChipStyledProps;
