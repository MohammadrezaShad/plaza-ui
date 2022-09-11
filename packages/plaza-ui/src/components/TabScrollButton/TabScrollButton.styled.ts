import styled, {css, CSSObject} from 'styled-components';

import {TabsOrientation} from '../Tabs/Tabs';

export const TabButton = styled.div<{
  $disabled?: boolean;
  $orientation: TabsOrientation;
  sx?: CSSObject;
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  background-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  border-radius: 0;
  padding: 0;
  cursor: pointer;
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  color: inherit;
  width: ${({theme}) => theme.pxToRem(40)};
  flex-shrink: 0;
  opacity: ${({$disabled}) => ($disabled ? 0.3 : 0.8)};
  ${({theme, $orientation}) =>
    $orientation === 'vertical'
      ? css`
          height: ${theme.pxToRem(40)};
          width: 100%;
          & svg {
            transform: rotate(${theme.direction === 'rtl' ? -90 : 90}deg);
          }
        `
      : null};

  ${({sx}) => sx};
`;
