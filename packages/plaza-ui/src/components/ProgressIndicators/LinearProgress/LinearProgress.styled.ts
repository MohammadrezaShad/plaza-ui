import {MainColor} from '@plaza-ui/styles/lib/createColors';
import getMainThemeColor from '@plaza-ui/styles/lib/utils/getMainThemeColor';
import styled, {CSSObject} from 'styled-components';

import {ProgressSize} from '../Progress.types';

export const Wrap = styled.div<{sx?: CSSObject}>`
  display: flex;
  align-items: center;
  ${({sx}) => sx};
`;

export const Track = styled.div<{
  $size: ProgressSize;
  $trackColor: MainColor | 'stroke';
  $trackHighlightColor?: string;
}>`
  display: flex;
  height: ${({theme, $size}) => theme.pxToRem(getLinearProgressSize($size))};
  background-color: ${({theme, $trackColor, $trackHighlightColor}) =>
    $trackHighlightColor ||
    ($trackColor === 'stroke'
      ? theme.colors.stroke.origin
      : getMainThemeColor(theme, $trackColor))};
  width: 100%;
  overflow: hidden;
  border-radius: ${({theme}) => theme.radius.small}; ;
`;

export const Progress = styled.div<{
  $value: number;
  $progressColor: MainColor;
  $highlightColor?: string;
  $transition?: number;
  $hasTransition: boolean;
  $direction: 'ltr' | 'rtl';
}>`
  flex: 1;
  transform-origin: left;
  background-color: ${({theme, $progressColor, $highlightColor}) =>
    $highlightColor || getMainThemeColor(theme, $progressColor)};
  transform: ${({$value, $direction}) =>
    $direction === 'ltr'
      ? `translateX(-${100 - $value}%)`
      : `translateX(${100 - $value}%)`};

  transition: all
    ${({theme, $transition, $hasTransition}) => {
      if (!$hasTransition) return null;
      if ($transition === undefined) {
        return theme.transition.duration;
      }
      return `${$transition}ms`;
    }};
  will-change: transform;
  border-radius: ${({theme}) => theme.radius.small}; ;
`;

export const Label = styled.span`
  display: inline-block;
  ${({theme}) => theme.typography.variants.caption};
  color: ${({theme}) => theme.colors.text.primary};
  margin: ${({theme}) =>
    theme.direction === 'ltr'
      ? `0 ${theme.spacing(3)} 0 0`
      : `0 0 0 ${theme.spacing(3)}`};
`;

function getLinearProgressSize(size: ProgressSize) {
  switch (size) {
    case 'medium':
      return 4;
    case 'large':
      return 8;
    case 'small':
      return 1;
    default:
      return 4;
  }
}
