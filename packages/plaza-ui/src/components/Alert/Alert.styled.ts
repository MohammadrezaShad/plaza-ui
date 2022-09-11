/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

import {AlertSize} from '.';
import {
  AlertSeverity,
  AlertStyledProps,
  AlertTextColor,
  AlertType,
  AlertVariant,
  GetAlertBackgroundColor,
  GetAlertColor,
} from './Alert.types';

export const Alert = styled.div<AlertStyledProps>`
  font-family: ${({theme}) => theme.typography.fontFamily.rtl};
  box-shadow: ${({theme, $type}) =>
    $type === 'inline' ? 'none' : theme.shadows.highOpacity[200]};
  border-radius: ${({theme}) => theme.radius.large};
  background: ${getAlertBackgroundColor};
  width: ${({theme, $width}) => ($width ? theme.pxToRem($width) : '100%')};
  border: ${({theme, $variant, $severity}) =>
    $variant === 'outlined'
      ? `1px solid ${getAlertColor({theme, $severity})}`
      : null};
  ${({sx}) => sx};
`;

export const Container = styled.div<{$size: AlertSize}>`
  display: flex;
  padding: ${({theme, $size}) => theme.spacing($size === 'medium' ? 5 : 4)};
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto 0;
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({theme}) => theme.spacing(5)};
`;

export const Title = styled.span<AlertTextColor>`
  ${({theme}) => theme.typography.variants.h3};
  color: ${getAlertTextColor};
  &:not(:last-child) {
    margin-bottom: ${({theme}) => theme.spacing(2)};
  }
`;

export const Text = styled.span<AlertTextColor>`
  display: inline-flex;
  ${({theme}) => theme.typography.variants.body2};
  color: ${getAlertTextColor};
`;

export const Bottom = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: ${({theme}) => theme.spacing(5)};
  background-color: ${({theme}) => theme.colors.backgroundVariant.origin};
  border-bottom-right-radius: ${({theme}) => theme.radius.large};
  border-bottom-left-radius: ${({theme}) => theme.radius.large};
`;

export const InlineActions = styled.div`
  display: flex;
  align-items: center;
  margin-right: auto;
  padding-right: ${({theme}) => theme.spacing(3)};
`;

export const Block = styled.div<{$type: AlertType}>`
  display: inline-flex;
  align-items: flex-start;
  padding-left: ${({theme}) => theme.spacing(4)};
`;

export const IconWrap = styled.div<{
  $severity?: AlertSeverity;
  $type: AlertType;
  $variant: AlertVariant;
  $size: AlertSize;
}>`
  display: inline-flex;
  padding: ${({theme, $type, $size}) =>
    $type === 'inline' && $size === 'small' ? null : theme.spacing(3)};
  border-radius: ${({theme}) => theme.radius.large};
  background-color: ${({$variant, $type, $size}) =>
    $type === 'inline' && $size === 'small' && $variant === 'filled'
      ? null
      : getAlertColor};
`;

export const Icon = styled.span<{
  $severity?: AlertSeverity;
  $variant: AlertVariant;
}>`
  width: ${({theme}) => theme.pxToRem(32)};
  color: ${({theme}) => theme.colors.background.origin};
`;

export const Action = styled.button`
  &:not(:last-child) {
    margin-left: ${({theme}) => theme.spacing(5)};
  }
`;

function getAlertBackgroundColor({
  $severity,
  theme,
  $variant,
  $type,
}: GetAlertBackgroundColor) {
  switch ($variant) {
    case 'outlined':
    case 'standard':
      return theme.colors.surface.origin;
    case 'filled':
      return $type === 'inline'
        ? getAlertInlineColor({$severity, theme})
        : getAlertColor({$severity, theme});
    default:
      return theme.colors.surface.origin;
  }
}

function getAlertColor({$severity, theme}: GetAlertColor) {
  switch ($severity) {
    case 'error':
      return theme.colors.danger.origin;
    case 'success':
      return theme.colors.success.origin;
    case 'warning':
      return theme.colors.warning.origin;
    case 'info':
    default:
      return theme.colors.info.origin;
  }
}

function getAlertInlineColor({$severity, theme}: GetAlertColor) {
  switch ($severity) {
    case 'error':
      return `linear-gradient(
        0deg,
        ${theme.colors.changeAlpha(theme.colors.background.origin, 0.9)},
        ${theme.colors.changeAlpha(theme.colors.background.origin, 0.9)}
    ),
     ${theme.colors.danger.origin}
    `;
    case 'success':
      return `linear-gradient(
        0deg,
        ${theme.colors.changeAlpha(theme.colors.background.origin, 0.9)},
        ${theme.colors.changeAlpha(theme.colors.background.origin, 0.9)}
    ),
     ${theme.colors.success.origin}
    `;
    case 'warning':
      return `linear-gradient(
        0deg,
        ${theme.colors.changeAlpha(theme.colors.background.origin, 0.9)},
        ${theme.colors.changeAlpha(theme.colors.background.origin, 0.9)}
    ),
     ${theme.colors.warning.origin}
    `;
    case 'info':
    default:
      return `linear-gradient(
        0deg,
        ${theme.colors.changeAlpha(theme.colors.background.origin, 0.9)},
        ${theme.colors.changeAlpha(theme.colors.background.origin, 0.9)}
    ),
     ${theme.colors.info.origin}
    `;
  }
}

function getAlertTextColor({
  theme,
  $severity,
  $variant,
  $type,
}: AlertTextColor) {
  if ($type === 'modal' || $variant !== 'filled') {
    return $variant === 'filled'
      ? theme.colors.text.invert
      : theme.colors.text.primary;
  }
  return getAlertColor({$severity, theme});
}
