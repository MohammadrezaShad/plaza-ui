import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import getDefaultThemeColor from '@plaza-ui/styles/lib/utils/getDefaultThemeColor';
import styled, {css} from 'styled-components';

import {
  ChipColor,
  ChipSize,
  ChipStyledMethodProps,
  ChipStyledProps,
} from './Chip.types';

export const Chip = styled.div<ChipStyledProps>`
  display: flex;
  align-items: center;
  min-height: ${({theme, $size}) =>
    $size === 'small' ? theme.pxToRem(24) : theme.pxToRem(30)};
  cursor: ${({$disabled, $clickable}) =>
    $disabled || !$clickable ? 'default' : 'pointer'};
  opacity: ${({$disabled}) => ($disabled ? 0.3 : null)};
  border-radius: ${({$variant, theme}) =>
    $variant === 'pill' ? theme.radius.large : theme.radius.small};
  ${setVariantStyle};
  ${({sx}) => sx};
`;

export const Label = styled.span`
  padding: ${({theme}) => `0 ${theme.spacing(3)}`};
  ${({theme}) => theme.typography.variants.caption};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Icon = styled.div<{$size: ChipSize}>`
  display: inline-flex;
  align-items: center;
  width: ${({$size, theme}) =>
    $size === 'small' ? theme.pxToRem(16) : theme.pxToRem(22)};
  flex-shrink: 0;
  user-select: none;
  margin-right: ${({theme}) => theme.spacing(3)};
`;

export const Delete = styled.div<{$size: ChipSize}>`
  display: inline-flex;
  align-items: center;
  width: ${({$size, theme}) =>
    $size === 'small' ? theme.pxToRem(16) : theme.pxToRem(22)};
  flex-shrink: 0;
  user-select: none;
  margin-left: ${({theme}) => theme.spacing(3)};
  cursor: pointer;
`;

export const DeleteIcon = styled.svg`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  user-select: none;
  margin-left: ${({theme}) => theme.spacing(3)};
  cursor: pointer;
`;

function setVariantStyle(props: ChipStyledMethodProps) {
  switch (props.$variant) {
    case 'contained':
      return generateContainedStyle(props);
    case 'outlined':
      return generateOutlinedStyle(props);
    default:
      return generateContainedStyle(props);
  }
}

function generateContainedStyle({theme, $color}: ChipStyledMethodProps) {
  const targetColor = getChipColor(theme, $color);
  return css`
    color: ${theme.colors.getContrastColorOf(targetColor!)};
    background-color: ${targetColor!};
    & * {
      color: ${theme.colors.getContrastColorOf(targetColor!)};
    }
  `;
}

function generateOutlinedStyle({theme, $color}: ChipStyledMethodProps) {
  const targetColor = getChipColor(theme, $color);
  return css`
    color: ${targetColor};
    border: 1px solid ${targetColor};
    & * {
      color: ${targetColor};
    }
  `;
}

function getChipColor(theme: DefaultTheme, color?: ChipColor) {
  return getDefaultThemeColor(theme, color);
}
