/* eslint-disable no-nested-ternary */
import {DefaultColor} from '@plaza-ui/styles/lib/createColors';
import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import styled, {CSSObject} from 'styled-components';

import {AvatarSize, AvatarVariant} from './Avatar';

export type AvatarStyledProps = {
  $variant: AvatarVariant;
  $width?: number;
  $height?: number;
  $bgColor?: DefaultColor | string;
  $size: AvatarSize;
  sx?: CSSObject;
};

export type GetAvatarBackgroundColor = {
  theme: DefaultTheme;
  $bgColor: DefaultColor | string;
};

const avatarSize = {
  small: 32,
  medium: 42,
  large: 60,
};

export const Avatar = styled.div<AvatarStyledProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({theme, $size, $width}) =>
    theme.pxToRem($width || avatarSize[$size])};
  height: ${({theme, $size, $height}) =>
    theme.pxToRem($height || avatarSize[$size])};
  font-size: ${({theme}) => theme.pxToRem(20)};
  font-family: ${({theme}) => theme.typography.fontFamily.ltr};
  line-height: 1;
  border-radius: 50%;
  overflow: hidden;
  user-select: none;
  background-color: ${({theme, $bgColor}) =>
    $bgColor
      ? getAvatarBackgroundColor({theme, $bgColor})
      : theme.colors.backgroundVariant.origin};
  color: ${({theme, $bgColor}) => {
    const bgColor = $bgColor
      ? getAvatarBackgroundColor({theme, $bgColor})
      : theme.colors.backgroundVariant.origin;
    return theme.colors.getContrastColorOf(bgColor);
  }};
  border-radius: ${({theme, $variant}) =>
    $variant === 'rounded'
      ? theme.radius.small
      : $variant === 'circular'
      ? '50%'
      : 0};
  ${({sx}) => sx};
`;

export const AvatarImg = styled.img`
  width: 100%;
  height: 100%;
  text-align: center;
  object-fit: cover;
  color: transparent;
  text-indent: 10000;
`;

export const AvatarFallback = styled.svg`
  width: 75%;
  height: 75%;
`;

function getAvatarBackgroundColor({theme, $bgColor}: GetAvatarBackgroundColor) {
  switch ($bgColor) {
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
    default:
      return $bgColor;
  }
}
