/* eslint-disable no-nested-ternary */
import Color from 'color';
import styled, {css, CSSObject, keyframes} from 'styled-components';

import {SkeletonProps} from './Skeleton';

type SkeletonPickedProps = Pick<
  SkeletonProps,
  'animation' | 'variant' | 'height' | 'width'
>;

export type SkeletonStyledProps = {
  [Property in keyof SkeletonPickedProps as `$${Property}`]: SkeletonPickedProps[Property];
} & {$hasChildren: boolean; sx?: CSSObject};

const pulseKeyframe = keyframes`
   0% {
     opacity: 1;
   }
   50% {
     opacity: 0.4;
   }
   100% {
     opacity: 1;
   }
 `;

const waveKeyframe = keyframes`
0% {
  transform: translateX(-100%);
}
50% {
  /* +0.5s of delay between each loop */
  transform: translateX(100%);
}
100% {
  transform: translateX(100%);
}
`;

export const Skeleton = styled.div<SkeletonStyledProps>`
  display: block;
  background-color: ${({theme}) =>
    Color(theme.colors.black)
      .alpha(theme.darkMode ? 0.13 : 0.11)
      .toString()};
  ${({$variant}) =>
    $variant === 'text'
      ? css`
          margin-top: 0;
          margin-bottom: 0;
          height: auto;
          transform-origin: 0 55%;
          transform: scale(1, 1);
          &:empty:before {
            content: '"\\00a0"';
          }
        `
      : null};
  ${({$variant}) =>
    $variant === 'circle'
      ? css`
          border-radius: 50%;
        `
      : null};
  ${({$hasChildren}) =>
    $hasChildren
      ? css`
          & > * {
            visibility: hidden;
          }
        `
      : null};
  max-width: ${({$hasChildren, $width}) =>
    $hasChildren && !$width ? 'fit-content' : null};
  height: ${({$hasChildren, $height, theme}) =>
    $hasChildren && !$height
      ? 'auto'
      : typeof $height === 'number'
      ? theme.pxToRem($height)
      : $height};
  width: ${({$width, theme}) =>
    typeof $width === 'number' ? theme.pxToRem($width) : $width};
  ${({$animation}) =>
    $animation === 'pulse'
      ? css`
          animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
        `
      : null};
  ${({$animation, theme}) =>
    $animation === 'wave'
      ? css`
          position: relative;
          overflow: hidden;
          /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          &::after {
            animation: ${waveKeyframe} 1.6s linear 0.5s infinite;
            background: linear-gradient(
              90deg,
              transparent,
              ${Color(theme.colors.black).alpha(0.04).toString()},
              transparent
            );
            content: '';
            position: absolute;
            transform: translateX(
              -100%
            ); /* Avoid flash during server-side hydration */
            bottom: 0;
            left: 0;
            right: 0;
            top: 0;
          }
        `
      : null}
  ${({sx}) => sx};
`;
