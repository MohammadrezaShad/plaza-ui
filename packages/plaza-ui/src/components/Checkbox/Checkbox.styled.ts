import getMainThemeColor from '@plaza-ui/styles/lib/utils/getMainThemeColor';
import styled, {css} from 'styled-components';

import {ToggleArgs, ToggleColorArgs, WrapArgs} from '../../shared';

export const Layout = styled.span<ToggleColorArgs & ToggleArgs>`
  display: inline-block;
  width: ${({theme}) => theme.pxToRem(24)};
  height: ${({theme}) => theme.pxToRem(24)};
  border: ${({theme, $on, $highlightColor, $toggleColor}) =>
    `2px solid ${
      $on
        ? $highlightColor || getMainThemeColor(theme, $toggleColor)
        : theme.colors.stroke.origin
    }`};
  border-radius: ${({theme}) => theme.radius.small};
  background-color: ${({theme, $on, $highlightColor, $toggleColor}) =>
    $on
      ? $highlightColor || getMainThemeColor(theme, $toggleColor)
      : 'transparent'};
  transition: ${({theme}) => `all ${theme.transition.duration} `};
  box-shadow: 0 0 0 0 transparent;
`;

export const Wrap = styled.div<WrapArgs>`
  display: inline-flex;
  padding: ${({theme}) => theme.spacing(3)};
  position: relative;
  cursor: ${({$disabled}) => ($disabled ? null : 'pointer')};

  ${({$disabled, $hasFocus, theme, $highlightColor, $toggleColor}) =>
    $disabled || !$hasFocus
      ? null
      : css`
          &:focus-within {
            ${Layout} {
              box-shadow: ${theme.shadows.lowOpacity[200]},
                0px 0px 0px 4px
                  ${theme.colors.tint(
                    $highlightColor || getMainThemeColor(theme, $toggleColor),
                    0.8,
                  )};
            }
          }
        `}

  ${({$disabled, $hasHover, theme, $highlightColor, $toggleColor}) =>
    $disabled || !$hasHover
      ? null
      : css`
          &:hover {
            ${Layout} {
              box-shadow: ${theme.shadows.lowOpacity[200]},
                0px 0px 0px 4px
                  ${theme.colors.tint(
                    $highlightColor || getMainThemeColor(theme, $toggleColor),
                    0.8,
                  )};
            }
          }
        `}
        ${({sx}) => sx};
`;

export const Container = styled.div<{
  $disabled?: boolean;
}>`
  display: inline-flex;
  direction: ltr;
  flex: 0 0 auto;
  opacity: ${({$disabled}) => ($disabled ? '0.3' : null)};
`;

export const Input = styled.input<{$disabled?: boolean}>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: ${({$disabled}) => ($disabled ? null : 'pointer')};
`;

export const Icon = styled.svg<ToggleArgs>`
  position: absolute;
  top: 50%;
  right: 50%;
  color: ${({theme}) => theme.colors.surface.origin};
  width: ${({theme}) => theme.pxToRem(12)};
  transform: ${({$on}) =>
    $on ? `translate(50%, -50%) scaleX(1)` : `translate(50%, -50%) scaleX(0)`};
  transition: all ${({theme}) => theme.transition.duration};
  transition-delay: 0.1s;
  stroke-dasharray: 21;
`;

export const Text = styled.span<{$disabled?: boolean}>`
  display: inline-block;
  color: ${({theme}) => theme.colors.text.primary};
  opacity: ${({$disabled}) => ($disabled ? '0.3' : null)};
`;

export const Tick = styled.svg<ToggleArgs>`
  width: ${({theme}) => theme.pxToRem(12)};
  height: ${({theme}) => theme.pxToRem(9)};
  position: absolute;
  top: 50%;
  right: 50%;
  fill: none;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16;
  stroke-dashoffset: ${({$on}) => ($on ? 0 : '16')};
  transition: all ${({theme}) => theme.transition.duration};
  transition-delay: 0.1s;
  transform: translate(50%, -50%) translate3d(0, 0, 0);
`;
