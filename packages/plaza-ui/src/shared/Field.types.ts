import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import {ReactNode} from 'react';

import {FieldClasses} from '../components/Field/fieldClasses';
import {SxType} from '../hooks/useSxProp';
import {ReactFocusEvent, ReactMouseEvent} from './Main.types';

export enum FieldActionTypes {
  CHANGE = 'CHANGE',
  RESET = 'RESET',
}
export type FieldAction =
  | {type: FieldActionTypes.RESET; initialState: FieldState}
  | {type: FieldActionTypes.CHANGE; payload: string};

export type FieldState = {
  value?: string;
};

export type FieldReducer = (
  state: FieldState,
  action: FieldAction,
) => FieldState;

export type FieldOnChange = (reducer: FieldState, action: FieldAction) => void;

export type UseFieldArgs = {
  initialValue?: string;
  reducer?: FieldReducer;
  onChange?: FieldOnChange;
  readOnly?: boolean;
} & FieldState;

export type WithFieldWrapProps = {
  subChildren?: boolean;
  label?: boolean;
  helperText?: boolean;
  id?: string;
};

export type FieldSize = 'large' | 'medium' | 'small';
export type FieldVariant = 'filled' | 'outlined' | 'standard';

export type FieldProps = {
  autoComplete?: 'off' | 'on';
  autoFocus?: boolean;
  initialValue?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  label?: string | number;
  error?: boolean;
  success?: boolean;
  helperText?: string | number;
  required?: boolean;
  type?: string;
  icon?: JSX.Element;
  placeholder?: string;
  value?: string;
  id?: string;
  size?: FieldSize;
  name?: string;
  optionalText?: string;
  isOptional?: boolean;
  variant?: FieldVariant;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: ReactFocusEvent<HTMLInputElement>;
  onBlur?: ReactFocusEvent<HTMLInputElement>;
  onClick?: ReactMouseEvent<HTMLInputElement>;
  onIconClick?: ReactMouseEvent<HTMLInputElement>;
  readOnly?: boolean;
  children?: ReactNode;
  sx?: SxType;
  className?: string;
  classes?: Partial<FieldClasses>;
};

export type FieldStyledProps = {
  $error?: boolean;
  $disabled?: boolean;
  $icon?: boolean;
  $fullWidth?: boolean;
  $variant?: FieldVariant;
  $size?: FieldSize;
  $success?: boolean;
};

export type FiledStyledAction = {
  theme: DefaultTheme;
  $error?: boolean;
  $disabled?: boolean;
  $icon?: boolean;
  $fullWidth?: boolean;
  $success?: boolean;
  $size?: FieldSize;
};
