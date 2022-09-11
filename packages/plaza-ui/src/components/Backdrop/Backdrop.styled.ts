import Color from 'color';
import styled, {CSSObject} from 'styled-components';

import {BackdropTransition} from './Backdrop';

export const Backdrop = styled.div<{
  $open?: boolean;
  $zIndex?: number;
  $transition?: BackdropTransition;
  $overlayColor?: string;
  $overlayAlpha?: number;
  sx?: CSSObject;
}>`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  position: fixed;
  align-items: center;
  z-index: ${({$zIndex, theme}) => $zIndex || theme.zIndexes.backdrop};
  justify-content: center;
  background-color: ${({theme, $overlayColor, $overlayAlpha}) =>
    Color($overlayColor || theme.colors.black)
      .alpha($overlayAlpha || 0.5)
      .string()};
  -webkit-tap-highlight-color: transparent;
  ${({sx}) => sx};
`;
