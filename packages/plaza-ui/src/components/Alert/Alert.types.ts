import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import {CSSObject} from 'styled-components';

import {SxType} from '../../hooks/useSxProp';
import {ReactMouseEvent} from '../../shared';
import {ButtonVariant} from '../Button/Button.types';
import {AlertClasses} from './alertClasses';

export type AlertSeverity = 'info' | 'success' | 'error' | 'warning';
export type AlertIcon = string | JSX.Element;
export type AlertVariant = 'filled' | 'outlined' | 'standard';
export type AlertAction = string | JSX.Element;
export type AlertSize = 'small' | 'medium';
export type AlertType = 'inline' | 'modal';

export type AlertProps = {
  severity?: AlertSeverity;
  icon?: AlertIcon;
  hasIcon?: boolean;
  variant?: AlertVariant;
  onClick?: ReactMouseEvent<Element>;
  action?: AlertAction;
  onClose?: ReactMouseEvent<Element>;
  closeAction?: AlertAction;
  closeActionType?: ButtonVariant;
  actionType?: ButtonVariant;
  title?: string;
  text?: string;
  width?: number;
  sx?: SxType;
  classes?: Partial<AlertClasses>;
  className?: string;
  color?: string;
  size?: AlertSize;
  type?: AlertType;
};

type AlertDefaultProps = Pick<
  AlertProps,
  'variant' | 'severity' | 'width' | 'type'
>;

export type AlertStyledProps = {
  [Property in keyof AlertDefaultProps as `$${Property}`]?: AlertDefaultProps[Property];
} & {sx?: CSSObject};

export type GetAlertColor = {
  $severity?: AlertSeverity;
  theme: DefaultTheme;
};

export type GetAlertBackgroundColor = {
  $severity?: AlertSeverity;
  $variant?: AlertVariant;
  theme: DefaultTheme;
  $type?: AlertType;
};

export type AlertTextColor = {
  $severity?: AlertSeverity;
  $variant?: AlertVariant;
  theme: DefaultTheme;
  $type?: AlertType;
};
