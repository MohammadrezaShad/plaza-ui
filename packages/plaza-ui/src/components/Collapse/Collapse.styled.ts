import {canUseDom} from '@plaza-ui/utils/lib/canUseDom';
import styled, {css, CSSObject} from 'styled-components';

import {TransitionTimeout} from '../../shared';

export const Wrap = styled.div<{
  $size: string;
  $collapseSize?: number;
  $transition: TransitionTimeout;
  $isOpen?: boolean;
  sx?: CSSObject;
}>`
  ${({$size, $collapseSize, theme, $isOpen}) =>
    $size === 'height'
      ? css`
          height: ${$isOpen && !canUseDom ? 'auto' : 0};
          min-height: ${$collapseSize ? theme.pxToRem($collapseSize) : null};
        `
      : css`
          min-width: ${$collapseSize ? theme.pxToRem($collapseSize) : null};
        `}
  overflow: hidden;
  transition: ${({$size, $transition}) =>
    `${$size} ${$transition.enter}ms cubic-bezier(0.4, 0, 0.2, 1) 0ms`};
  ${({sx}) => sx};
`;
