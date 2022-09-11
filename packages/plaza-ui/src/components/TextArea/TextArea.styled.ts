import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import styled, {css, CSSObject} from 'styled-components';

import {TextAreaProps} from './TextArea';

type TextAreaPickedProps = Pick<
  TextAreaProps,
  'error' | 'disabled' | 'icon' | 'fullWidth' | 'success' | 'preventResize'
>;

export type TextAreaStyledProps = {
  [Property in keyof TextAreaPickedProps as `$${Property}`]: TextAreaPickedProps[Property];
};

export type TextAreaMethodProps = {
  [Property in keyof TextAreaPickedProps as `$${Property}`]: TextAreaPickedProps[Property];
} & {theme: DefaultTheme};

export const Wrap = styled.div<{$disabled?: boolean; sx?: CSSObject}>`
  position: relative;
  opacity: ${({$disabled}) => ($disabled ? 0.3 : null)};
  ${({sx}) => sx};
`;

const textAreaDefaultStyle = css`
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

export const TextArea = styled.textarea<TextAreaStyledProps>`
  ${textAreaDefaultStyle}
  ${setFiledGlobalStyle}
  padding:${({theme, $error, $success, $icon}) =>
    `${theme.spacing(3)} ${
      theme.direction === 'ltr'
        ? getFieldPadding({theme, $error, $success, $icon})
        : theme.spacing(4)
    }
      ${theme.spacing(3)} ${
      theme.direction === 'rtl'
        ? getFieldPadding({theme, $error, $success, $icon})
        : theme.spacing(4)
    }`}
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
  top: ${({theme}) => theme.spacing(4)};
  left: ${({theme}) => (theme.direction === 'rtl' ? theme.spacing(4) : null)};
  right: ${({theme}) => (theme.direction === 'ltr' ? theme.spacing(4) : null)};
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
  $preventResize,
}: TextAreaMethodProps) {
  return css`
    color: ${theme.colors.text.primary};
    border: 1px solid ${getBorderColor};
    background-color: ${theme.colors.background.origin};
    resize: ${$preventResize ? 'none' : null};
    ${theme.typography.variants.body1};
    cursor: ${$disabled ? 'default' : 'text'};
    border-radius: ${theme.radius.small};
    width: ${$fullWidth ? '100%' : null};
    ::placeholder {
      ${theme.typography.variants.body2};
      color: ${theme.colors.text.secondary};
    }
  `;
}

function getHelpColor({theme, $error, $success}: TextAreaMethodProps) {
  if ($error) {
    return theme.colors.danger.origin;
  }
  if ($success) {
    return theme.colors.success.origin;
  }
  return theme.colors.text.primary;
}

function getBorderColor({theme, $error, $success}: TextAreaMethodProps) {
  if ($error) {
    return theme.colors.danger.origin;
  }
  if ($success) {
    return theme.colors.success.origin;
  }
  return theme.colors.stroke.origin;
}

function getFieldPadding({
  theme,
  $error,
  $success,
  $icon,
}: TextAreaMethodProps) {
  if ($icon && ($error || $success)) {
    return theme.spacing(11);
  }
  if ($icon || $error || $success) {
    return theme.spacing(7);
  }
  return theme.spacing(4);
}
