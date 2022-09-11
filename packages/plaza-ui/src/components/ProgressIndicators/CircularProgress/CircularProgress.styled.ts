import {MainColor} from '@plaza-ui/styles/lib/createColors';
import getMainThemeColor from '@plaza-ui/styles/lib/utils/getMainThemeColor';
import styled, {css, CSSObject, keyframes} from 'styled-components';

import {ProgressSize} from '../Progress.types';
import {CircularVariant} from './CircularProgress';

const SIZE = 40;

const rotate = keyframes`
  from {
    transform-origin:50% 50%;
  }

  to {
    transform: rotate(360deg);
  }
`;

const circularDashKeyframe = keyframes`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
`;

export const Wrap = styled.div<{$size: ProgressSize; sx?: CSSObject}>`
  position: relative;
  height: ${({theme, $size}) => theme.pxToRem(getCircularSize($size))};
  width: ${({theme, $size}) => theme.pxToRem(getCircularSize($size))};
  ${({sx}) => sx};
`;

export const Track = styled.svg<{
  $size: ProgressSize;
  $trackColor: MainColor | 'stroke';
  $trackHighlightColor?: string;
}>`
  CIRCLE {
    stroke-width: ${({$size}) => `${getThickness($size)}px`};
    stroke: ${({theme, $trackColor, $trackHighlightColor}) =>
      $trackHighlightColor ||
      ($trackColor === 'stroke'
        ? theme.colors.stroke.origin
        : getMainThemeColor(theme, $trackColor))};
  }
`;

export const ProgressWrap = styled.div<{
  $size: ProgressSize;
  $hasTransition: boolean;
}>`
  display: inline-block;
  left: 0;
  position: absolute;
  height: ${({theme, $size}) => theme.pxToRem(getCircularSize($size))};
  width: ${({theme, $size}) => theme.pxToRem(getCircularSize($size))};
  ${({$hasTransition}) =>
    $hasTransition
      ? css`
          animation: ${rotate} 1.5s infinite linear;
        `
      : null};
`;

export const Progress = styled.svg<{
  $value: number;
  $size: ProgressSize;
  $progressColor: MainColor;
  $highlightColor?: string;
  $transition?: number;
  $hasTransition: boolean;
  $variant: CircularVariant;
}>`
  ${({$value}) => setStrokeStyles($value)};
  will-change: stroke-dasharray;
  transition: all
    ${({theme, $transition, $hasTransition}) => {
      if (!$hasTransition) return null;
      if ($transition === undefined) {
        return theme.transition.duration;
      }
      return `${$transition}ms`;
    }};
  CIRCLE {
    stroke-width: ${({$size}) => `${getThickness($size)}px`};
    stroke: ${({theme, $progressColor, $highlightColor}) =>
      $highlightColor || getMainThemeColor(theme, $progressColor)};

    ${({$variant}) =>
      $variant === 'indeterminate'
        ? css`
            animation: ${circularDashKeyframe} 1.4s ease-in-out infinite;
          `
        : null};
  }
`;

export const Label = styled.span`
  display: inline-block;
  ${({theme}) => theme.typography.variants.caption};
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

function getCircularSize(size: ProgressSize) {
  switch (size) {
    case 'large':
      return 72;
    case 'medium':
      return 48;
    case 'small':
      return 24;
    default:
      return 48;
  }
}

function setStrokeStyles(value: number) {
  const circumference = 2 * Math.PI * (SIZE / 2);
  const strokeDasharray = circumference.toFixed(3);
  const strokeDashoffset = `${(((100 - value) / 100) * circumference).toFixed(
    3,
  )}px`;

  return css`
    stroke-dasharray: ${strokeDasharray};
    stroke-dashoffset: ${strokeDashoffset};
  `;
}

function getThickness(size: ProgressSize) {
  switch (size) {
    case 'medium':
      return 4;
    case 'small':
      return 2;
    default:
      return 4;
  }
}
