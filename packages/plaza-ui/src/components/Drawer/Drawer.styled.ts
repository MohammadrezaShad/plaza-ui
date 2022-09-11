import styled, {css, CSSObject} from 'styled-components';

import {DrawerProps} from './Drawer';

type DrawerPickedProps = Pick<
  DrawerProps,
  'isOpen' | 'anchor' | 'zIndex' | 'hasBackdrop'
>;

export type DrawerStyledProps = {
  [Property in keyof DrawerPickedProps as `$${Property}`]-?: DrawerPickedProps[Property];
} & {sx?: CSSObject};

const TOP_ANCHOR_STYLES = css`
  top: 0;
  left: 0;
  right: 0;
  bottom: auto;
  height: auto;
  max-height: 100%;
`;

const RIGHT_ANCHOR_STYLES = css`
  left: auto;
  right: 0;
`;

const LEFT_ANCHOR_STYLES = css`
  left: 0;
  right: auto;
`;

const BOTTOM_ANCHOR_STYLES = css`
  top: auto;
  left: 0;
  right: 0;
  bottom: 0;
  height: auto;
  max-height: 100%;
`;

export const Layout = styled.div<DrawerStyledProps>`
  top: 0;
  flex: 1 0 auto;
  height: 100%;
  display: flex;
  outline: 0;
  z-index: ${({theme}) => theme.zIndexes.popover};
  position: fixed;
  overflow-y: auto;
  flex-direction: column;
  -webkit-overflow-scrolling: touch;
  background-color: ${({theme}) => theme.colors.background.origin};
  ${setDrawerPosition}
`;

export const Drawer = styled.div<DrawerStyledProps>`
  position: fixed;
  z-index: ${({theme, $zIndex}) => $zIndex || theme.zIndexes.drawer};
  ${({$hasBackdrop}) =>
    $hasBackdrop
      ? css`
          top: 0;
          right: 0;
          left: 0;
          bottom: 0;
        `
      : css`
          top: 0;
          right: 0;
          left: 0;
        `};
  ${({sx}) => sx};
`;

function setDrawerPosition({$anchor}: DrawerStyledProps) {
  switch ($anchor) {
    case 'top':
      return TOP_ANCHOR_STYLES;
    case 'bottom':
      return BOTTOM_ANCHOR_STYLES;
    case 'right':
      return RIGHT_ANCHOR_STYLES;
    case 'left':
      return LEFT_ANCHOR_STYLES;
    default:
      return TOP_ANCHOR_STYLES;
  }
}
