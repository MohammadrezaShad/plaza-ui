import styled, {css, CSSObject} from 'styled-components';

import ScrollbarSize from './ScrollbarSize';
import {TabsIndicatorColor} from './Tabs';

export const Tabs = styled.div<{
  $isVertical?: boolean;
  $scrollButtonsHideMobile: boolean;
  $hasBorder?: boolean;
  sx?: CSSObject;
}>`
  display: flex;
  overflow: hidden;
  min-height: ${({theme}) => theme.pxToRem(45)};
  -webkit-overflow-scrolling: touch;
  flex-direction: ${({$isVertical}) => ($isVertical ? 'column' : 'row')};
  position: relative;
  ${({$hasBorder}) =>
    $hasBorder
      ? css`
          &::after {
            position: absolute;
            width: 100%;
            bottom: 0;
            content: '';
            background-color: ${({theme}) => theme.colors.stroke.origin};
            transform: translateY(-50%);
            height: 1px;
          }
        `
      : null};
  ${({sx}) => sx};

  /* border-bottom: 1px solid ${({theme}) => theme.colors.stroke.origin}; */
`;

export const TabsScroller = styled.div<{
  $fixed: boolean;
  $hideScrollbar: boolean;
  $scrollableX: boolean;
  $scrollableY: boolean;
}>`
  position: relative;
  display: inline-block;
  flex: 1 1 auto;
  white-space: nowrap;
  ${({$fixed}) =>
    $fixed
      ? css`
          overflow: hidden;
          width: 100%;
        `
      : null};
  ${({$hideScrollbar}) =>
    $hideScrollbar
      ? css`
          scrollbar-width: none;
          width: 100%;
          &::-webkit-scrollbar {
            display: none;
          }
        `
      : null};
  ${({$scrollableX}) =>
    $scrollableX
      ? css`
          overflow-x: auto;
          overflow-y: hidden;
        `
      : null};
  ${({$scrollableY}) =>
    $scrollableY
      ? css`
          overflow-x: hidden;
          overflow-y: auto;
        `
      : null};
`;

export const FlexContainer = styled.div<{
  $isVertical?: boolean;
  $isCentered?: boolean;
  'aria-orientation': string;
}>`
  display: flex;
  flex-direction: ${({$isVertical}) => ($isVertical ? 'column' : 'row')};
  justify-content: ${({$isCentered}) => ($isCentered ? 'center' : null)};
`;

export const TabsIndicator = styled.span<{
  $isVertical?: boolean;
  $indicatorColor?: TabsIndicatorColor;
}>`
  position: absolute;
  width: ${({$isVertical}) => ($isVertical ? '2px' : '100%')};
  height: ${({$isVertical}) => ($isVertical ? '100%' : '2px')};
  bottom: 0;
  transition: all 0.5s;
  background-color: ${({$indicatorColor, theme}) =>
    $indicatorColor === 'secondary'
      ? theme.colors.secondary.origin
      : theme.colors.primary.origin};
`;

export const TabsScrollbarSize = styled(ScrollbarSize)`
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;
