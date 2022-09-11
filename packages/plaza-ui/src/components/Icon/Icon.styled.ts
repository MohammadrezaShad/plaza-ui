import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import styled, {css, CSSObject} from 'styled-components';

import {IconColor, IconSize} from './Icon';

type IconStyledProps = {
  $size: IconSize;
  $color: IconColor;
  sx?: CSSObject;
};

type IconGetColorProps = {
  theme: DefaultTheme;
  $color: IconColor;
};

type IconSetSizeProps = {
  theme: DefaultTheme;
  $size: IconSize;
};

export const Svg = styled.svg<IconStyledProps>`
  direction: ${({theme}) => theme.direction};
  user-select: none;
  speak-as: none;
  display: inline-block;
  vertical-align: middle;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-decoration: none;
  font-size: ${({theme}) => theme.pxToRem(14)};
  color: ${({theme, $color}) => getSvgColor({theme, $color})};
  ${({theme, $size}) => setSvgSizes({theme, $size})};
  fill: currentColor;
  stroke: currentColor;
  ${({sx}) => sx};
`;

function getSvgColor({theme, $color: color}: IconGetColorProps) {
  switch (color) {
    case 'primary':
      return theme.colors.primary.origin;
    case 'secondary':
      return theme.colors.secondary.origin;
    case 'danger':
      return theme.colors.danger.origin;
    case 'success':
      return theme.colors.success.origin;
    case 'warning':
      return theme.colors.warning.origin;
    case 'info':
      return theme.colors.info.origin;
    case 'surface':
      return theme.colors.surface.origin;
    case 'stroke':
      return theme.colors.stroke.origin;
    case 'strokeVariant':
      return theme.colors.strokeVariant.origin;
    case 'background':
      return theme.colors.background.origin;
    case 'backgroundVariant2':
      return theme.colors.backgroundVariant2.origin;
    case 'backgroundVariant':
      return theme.colors.backgroundVariant.origin;
    case 'textPrimary':
      return theme.colors.text.primary;
    case 'textSecondary':
      return theme.colors.text.secondary;
    case 'textInvert':
      return theme.colors.text.invert;
    case 'currentColor':
    default:
      return 'currentColor';
  }
}

function setSvgSizes({theme, $size}: IconSetSizeProps) {
  if ($size === 'auto') {
    return css`
      width: 100%;
      height: 100%;
    `;
  }
  return css`
    width: ${theme.typography.pxToRem($size)};
    height: ${theme.typography.pxToRem($size)};
    min-width: ${theme.typography.pxToRem($size)};
    min-height: ${theme.typography.pxToRem($size)};
  `;
}
