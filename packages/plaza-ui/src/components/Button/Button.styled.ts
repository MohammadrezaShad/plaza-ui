/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import getDefaultThemeColor from '@plaza-ui/styles/lib/utils/getDefaultThemeColor';
import styled, {css, DefaultTheme} from 'styled-components';

import {
  ActionStyle,
  ButtonColor,
  ButtonSize,
  ButtonStyledMethodProps,
  ButtonStyledProps,
} from './Button.types';

const buttonDefaultStyle = css`
  color: inherit;
  border: 0;
  cursor: pointer;
  margin: 0;
  display: inline-flex;
  outline: 0;
  padding: 0;
  position: relative;
  align-items: center;
  user-select: none;
  border-radius: 0;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  background-color: transparent;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;
`;

const fullWidthStyle = css`
  width: 100%;
`;

export const Icon = styled.span<{
  $hasChild: boolean;
  $hasStartIcon: boolean;
  $hasEndIcon: boolean;
}>`
  display: inline-flex;
  align-items: center;
  transition: all ${({theme}) => theme.transition.duration};
  flex: 0 0 auto;
  margin-left: ${({theme, $hasChild, $hasStartIcon, $hasEndIcon}) =>
    ($hasChild && $hasStartIcon && theme.direction === 'rtl') ||
    ($hasChild && $hasEndIcon && theme.direction === 'ltr')
      ? theme.spacing(3)
      : null};
  margin-right: ${({theme, $hasChild, $hasStartIcon, $hasEndIcon}) =>
    ($hasChild && $hasStartIcon && theme.direction === 'ltr') ||
    ($hasChild && theme.direction === 'rtl' && $hasEndIcon)
      ? theme.spacing(3)
      : null};
`;

export const Button = styled.button<ButtonStyledProps>`
  ${buttonDefaultStyle}
  ${setGlobalStyle};
  ${setVariantStyle};
  ${({sx}) => sx};
`;

function setGlobalStyle({
  theme,
  $size: size,
  $fullWidth: fullWidth,
  $disabled: disabled,
  $hasDefaultCursor: hasDefaultCursor,
}: ButtonStyledMethodProps) {
  return css`
    padding: ${`0 ${theme.spacing(4)}`};
    min-height: ${getButtonMinHeight(theme, size)};
    border-radius: ${theme.radius.medium};
    transition: all ${theme.transition.duration};
    opacity: ${disabled ? 0.3 : null};
    cursor: ${disabled || hasDefaultCursor ? 'default' : 'pointer'};
    ${hasFullWidth(fullWidth)};
    ${getButtonTypography(theme, size)};
  `;
}

function getButtonMinHeight(theme: DefaultTheme, size?: ButtonSize) {
  switch (size) {
    case 'small':
      return `${theme.pxToRem(24)}`;
    case 'medium':
      return `${theme.pxToRem(40)}`;
    case 'large':
      return `${theme.pxToRem(48)}`;
    default:
      return `${theme.pxToRem(36)}`;
  }
}

function hasFullWidth(fullwidth?: boolean) {
  return fullwidth ? fullWidthStyle : null;
}

function getButtonTypography(theme: DefaultTheme, size?: ButtonSize) {
  switch (size) {
    case 'small':
      return theme.typography.variants.button3;
    case 'medium':
      return theme.typography.variants.button2;
    case 'large':
      return theme.typography.variants.button1;
    default:
      return theme.typography.variants.button2;
  }
}

function setVariantStyle(props: ButtonStyledMethodProps) {
  switch (props.$variant) {
    case 'contained':
      return generateContainedStyle(props);
    case 'outlined':
      return generateOutlinedStyle(props);
    case 'text':
      return generateTextStyle(props);
    default:
      return '';
  }
}

function generateContainedStyle({
  theme,
  $size: size,
  $color: color,
  $textColor: textColor,
  $hasFocus: hasFocus,
  $hasHover: hasHover,
  $hasActive: hasActive,
  $highlightColor: highlightColor,
  $disabled: disabled,
}: ButtonStyledMethodProps) {
  const targetColor = getButtonColor(theme, color);
  const tintColor = theme.colors.tint(targetColor, 0.2);
  const shadeColor = theme.colors.shade(targetColor, 0.2);
  return css`
    color: ${textColor || theme.colors.getContrastColorOf(targetColor)};
    background-color: ${targetColor};
    box-shadow: ${theme.shadows.lowOpacity[300]};
    border: 1px solid ${targetColor};

    & > ${Icon} {
      color: ${textColor || theme.colors.getContrastColorOf(targetColor)};
      width: ${getIconSize(theme, size)};
    }
    ${hasActive && !disabled
      ? css`
          &:active {
            ${setActionStyle({
              color: shadeColor,
              textColor,
              highlightColor,
              theme,
            })};
          }
        `
      : null}
    ${hasHover && !disabled
      ? css`
          &:hover {
            ${setActionStyle({
              color: tintColor,
              textColor,
              highlightColor,
              theme,
            })};
          }
        `
      : null}
    ${hasFocus && !disabled
      ? css`
          &:focus {
            ${setActionStyle({
              color: tintColor,
              textColor,
              highlightColor,
              theme,
            })};
          }
        `
      : null}
  `;
}

function generateOutlinedStyle({
  theme,
  $color: color,
  $size: size,
  $textColor: textColor,
  $highlightColor: highlightColor,
  $hasFocus: hasFocus,
  $hasHover: hasHover,
  $disabled: disabled,
  $hasActive: hasActive,
}: ButtonStyledMethodProps) {
  const targetColor = getButtonColor(theme, color);
  return css`
    color: ${textColor || theme.colors.text.primary};
    border: 1px solid ${targetColor};
    & > ${Icon} {
      color: ${textColor || targetColor};
      width: ${getIconSize(theme, size)};
    }
    ${hasActive && !disabled
      ? css`
          &:active {
            ${setActionStyle({
              color: targetColor,
              textColor,
              highlightColor,
              theme,
            })};
          }
        `
      : null}
    ${hasHover && !disabled
      ? css`
          &:hover {
            ${setActionStyle({
              color: targetColor,
              textColor,
              highlightColor,
              theme,
            })};
          }
        `
      : null}
    ${hasFocus && !disabled
      ? css`
          &:focus {
            ${setActionStyle({
              color: targetColor,
              textColor,
              highlightColor,
              theme,
            })};
          }
        `
      : null}
  `;
}

function generateTextStyle({
  theme,
  $color: color,
  $textColor: textColor,
  $noPadding: noPadding,
  $size: size,
}: ButtonStyledMethodProps) {
  const targetColor = getButtonColor(theme, color);
  return css`
    color: ${textColor ||
    (color === 'link' ? theme.colors.info.origin : targetColor)};
    text-decoration: ${color === 'link' ? 'underline' : null};
    background-color: transparent;
    padding: ${noPadding ? '0 !important' : null};
    & > ${Icon} {
      color: ${textColor || targetColor};
      width: ${getIconSize(theme, size)};
    }
  `;
}

function getButtonColor(theme: DefaultTheme, color?: ButtonColor): string {
  switch (color) {
    case 'link':
      return theme.colors.info.origin;
    default:
      return getDefaultThemeColor(theme, color) as string;
  }
}

function getIconSize(theme: DefaultTheme, size?: ButtonSize) {
  switch (size) {
    case 'small':
      return theme.pxToRem(16);
    case 'medium':
      return theme.pxToRem(16);
    case 'large':
      return theme.pxToRem(20);
    default:
      return theme.pxToRem(16);
  }
}

function setActionStyle({
  color,
  textColor,
  highlightColor,
  theme,
}: ActionStyle) {
  return css`
    background-color: ${color};
    color: ${highlightColor ||
    textColor ||
    theme.colors.getContrastColorOf(color)};
    & > ${Icon} {
      color: ${highlightColor ||
      textColor ||
      theme.colors.getContrastColorOf(color)};
    }
  `;
}
