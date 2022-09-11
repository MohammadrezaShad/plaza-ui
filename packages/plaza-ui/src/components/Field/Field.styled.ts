import styled, {css, CSSObject} from 'styled-components';

import {
  FieldSize,
  FieldStyledProps,
  FiledStyledAction,
} from '../../shared/Field.types';

const fieldDefaultStyle = css`
  display: block;
  color: currentColor;
  font: inherit;
  width: 100%;
  border: 0;
  outline: none;
  background: none;
  box-sizing: border-box;
  margin: 0;
  letter-spacing: inherit;
  -webkit-tap-highlight-color: transparent;
`;

export const Wrap = styled.div<{$disabled?: boolean; sx?: CSSObject}>`
  position: relative;
  opacity: ${({$disabled}) => ($disabled ? 0.3 : null)};
  ${({sx}) => sx};
`;

export const Field = styled.input<FieldStyledProps>`
  ${fieldDefaultStyle}
  ${setFiledGlobalStyle}
`;

export const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({theme}) => theme.spacing(3)};
`;

export const Optional = styled.span`
  margin-right: auto;
`;

export const Label = styled.label`
  display: block;
  &:not(:only-child) {
    margin-left: ${({theme}) => theme.spacing(3)};
  }
`;

export const Help = styled.span<{$error?: boolean; $success?: boolean}>`
  display: flex;
  align-items: center;
  margin-top: ${({theme}) => theme.spacing(2)};
  ${({theme}) => theme.typography.variants.caption};
  color: ${getHelpColor};
`;

export const IconWrap = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 50%;
  left: ${({theme}) => (theme.direction === 'rtl' ? theme.spacing(4) : null)};
  right: ${({theme}) => (theme.direction === 'ltr' ? theme.spacing(4) : null)};
  transform: translateY(-50%);
`;

export const Icon = styled.span<{$disabled?: boolean}>`
  display: inline-flex;
  align-items: center;
  width: ${({theme}) => theme.pxToRem(20)};
  color: ${({theme}) => theme.colors.text.primary};
  cursor: ${({$disabled}) => ($disabled ? 'default' : 'pointer')};
`;

export const StatusIcon = styled.svg<{$error?: boolean; $success?: boolean}>`
  &:not(:only-child) {
    margin-right: ${({theme}) => theme.spacing(3)};
  }
`;

function setFiledGlobalStyle({
  theme,
  $disabled,
  $fullWidth,
  $size,
}: FiledStyledAction) {
  return css`
    color: ${theme.colors.text.primary};
    border: 1px solid ${getBorderColor};
    background-color: ${theme.colors.background.origin};
    min-height: ${theme.pxToRem(getFieldHeight($size))};
    ${theme.typography.variants.body1};
    cursor: ${$disabled ? 'default' : 'text'};
    padding: 0 ${theme.direction === 'ltr' ? getFieldPadding : theme.spacing(4)}
      0 ${theme.direction === 'rtl' ? getFieldPadding : theme.spacing(4)};
    border-radius: ${theme.radius.small};
    width: ${$fullWidth ? '100%' : null};
    -webkit-appearance: none;
    margin: 0;
    -moz-appearance: textfield;
    ::placeholder {
      ${theme.typography.variants.body2};
      color: ${theme.colors.text.secondary};
    }
  `;
}

function getFieldHeight($size?: FieldSize) {
  switch ($size) {
    case 'large':
      return 48;
    case 'medium':
      return 40;
    case 'small':
      return 24;
    default:
      return 40;
  }
}

function getHelpColor({theme, $error, $success}: FiledStyledAction) {
  if ($error) {
    return theme.colors.danger.origin;
  }
  if ($success) {
    return theme.colors.success.origin;
  }
  return theme.colors.text.primary;
}

function getBorderColor({theme, $error, $success}: FiledStyledAction) {
  if ($error) {
    return theme.colors.danger.origin;
  }
  if ($success) {
    return theme.colors.success.origin;
  }
  return theme.colors.stroke.origin;
}

function getFieldPadding({theme, $error, $success, $icon}: FiledStyledAction) {
  if ($icon && ($error || $success)) {
    return theme.spacing(11);
  }
  if ($icon || $error || $success) {
    return theme.spacing(7);
  }
  return theme.spacing(4);
}
