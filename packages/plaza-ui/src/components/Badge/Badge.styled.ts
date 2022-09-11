import getDefaultThemeColor from '@plaza-ui/styles/lib/utils/getDefaultThemeColor';
import styled, {css} from 'styled-components';

import {BadgeStyledProps, BadgeStyledThemeProps} from './Badge.types';

export const Badge = styled.div<BadgeStyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: ${({theme}) => theme.spacing(1)};
  height: ${getBadgeSize};
  width: ${getBadgeSize};
  border-radius: 50%;
  ${setBadgeVariantStyles}
  ${getBadgeFont};
  ${({sx}) => sx};
`;

function getBadgeSize({
  $size,
  theme,
}: Pick<BadgeStyledThemeProps, '$size' | 'theme'>) {
  switch ($size) {
    case 'large':
      return theme.pxToRem(32);
    case 'normal':
      return theme.pxToRem(24);
    case 'small':
      return theme.pxToRem(16);
    default:
      return theme.pxToRem(24);
  }
}

function getBadgeColor({
  theme,
  $color,
}: Pick<BadgeStyledThemeProps, '$color' | 'theme'>) {
  switch ($color) {
    case 'dark':
      return theme.colors.text.primary;
    case 'strokeVariant':
      return theme.colors.strokeVariant.origin;
    default:
      return getDefaultThemeColor(theme, $color);
  }
}

function setBadgeVariantStyles({
  theme,
  $color,
  $variant,
}: BadgeStyledThemeProps) {
  const targetColor = getBadgeColor({theme, $color});
  switch ($variant) {
    case 'contained':
      return css`
        background-color: ${getBadgeColor};
        color: ${theme.colors.getContrastColorOf(targetColor!)};
      `;
    case 'outlined':
      return css`
        border: 1px solid ${getBadgeColor};
        color: ${theme.colors.text.primary};
      `;
    case 'text':
      return css`
        color: ${theme.colors.text.primary};
      `;
    default:
      css``;
  }
}

function getBadgeFont({theme, $size}: BadgeStyledThemeProps) {
  switch ($size) {
    case 'large':
      return theme.typography.variants.body1;
    case 'normal':
      return theme.typography.variants.body2;
    case 'small':
      return theme.typography.variants.overline;
    default:
      return theme.typography.variants.body2;
  }
}
