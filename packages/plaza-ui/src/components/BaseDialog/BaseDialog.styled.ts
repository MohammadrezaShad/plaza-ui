import styled, {css, CSSObject} from 'styled-components';

import {DialogScroll} from './BaseDialog';

export const Root = styled.div<{sx?: CSSObject}>`
  position: fixed;
  z-index: ${({theme}) => theme.zIndexes.modal};
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  direction: ltr;
  ${({sx}) => sx};
`;

export const Dialog = styled.div<{
  $isOpen: boolean;
  $scroll?: DialogScroll;
}>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: ${({theme}) => theme.zIndexes.modal};
  overflow: auto;
  direction: ltr;
`;

export const Layout = styled.div<{$scroll?: DialogScroll}>`
  height: 100%;
  outline: 0px;
  overflow: hidden auto;
  text-align: center;
  &:after {
    content: '';
    display: inline-block;
    vertical-align: middle;
    height: 100%;
    width: 0;
  }
`;

export const Container = styled.div<{$scroll?: DialogScroll}>`
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  position: relative;
  z-index: ${({theme}) => theme.zIndexes.popover};
  max-width: 100%;
  display: inline-flex;
  text-align: left;
  ${({$scroll}) =>
    $scroll === 'body'
      ? css`
          margin: ${({theme}) => theme.spacing(6)};
        `
      : null};
`;
