import getMainThemeColor from '@plaza-ui/styles/lib/utils/getMainThemeColor';
import styled, {CSSObject} from 'styled-components';

import {DialogBodyStylesProps} from './DialogBody';

export type DialogBodyStyledProps = {
  [Property in keyof DialogBodyStylesProps as `$${Property}`]: DialogBodyStylesProps[Property];
} & {sx?: CSSObject};

export const Wrapper = styled.div<DialogBodyStyledProps>`
  padding: ${({theme, $padding}) => theme.spacing($padding || 6)};
  border-radius: ${({theme, $radius}) =>
    $radius ? theme.radius[$radius] : theme.radius.large};
  background-color: ${({theme, $backgroundColor}) =>
    $backgroundColor
      ? getMainThemeColor(theme, $backgroundColor)
      : theme.colors.background.origin};
  direction: ${({theme}) => theme.direction};
  ${({sx}) => sx};
`;
