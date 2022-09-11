import getDefaultThemeColor from '@plaza-ui/styles/lib/utils/getDefaultThemeColor';
import styled, {css} from 'styled-components';

import {TagStyledProps, TagStyledThemeProps} from './Tag.types';

export const Tag = styled.div<TagStyledProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({theme}) => theme.radius.medium};
  min-height: ${getTagHeight};
  padding: 0 ${getBadgeSize};
  ${setBadgeVariantStyles};
  ${getTagFont}
  ${({sx}) => sx};
`;

function getTagHeight({theme, $size}: TagStyledThemeProps) {
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

function getBadgeSize({
  $size,
  theme,
}: Pick<TagStyledThemeProps, '$size' | 'theme'>) {
  switch ($size) {
    case 'large':
      return theme.pxToRem(24);
    case 'normal':
      return theme.pxToRem(16);
    case 'small':
      return theme.pxToRem(8);
    default:
      return theme.pxToRem(16);
  }
}

function getTagColor({
  theme,
  $color,
}: Pick<TagStyledThemeProps, '$color' | 'theme'>) {
  switch ($color) {
    case 'dark':
      return theme.colors.text.primary;
    case 'strokeVariant':
      return theme.colors.strokeVariant.origin;
    default:
      return getDefaultThemeColor(theme, $color);
  }
}

function setBadgeVariantStyles({theme, $color, $variant}: TagStyledThemeProps) {
  const targetColor = getTagColor({theme, $color}) as string;
  switch ($variant) {
    case 'contained':
      return css`
        background-color: ${targetColor};
        color: ${theme.colors.getContrastColorOf(targetColor)};
      `;
    case 'outlined':
      return css`
        border: 1px solid ${targetColor};
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

function getTagFont({theme, $size}: TagStyledThemeProps) {
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
