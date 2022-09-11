import getDefaultThemeColor from '@plaza-ui/styles/lib/utils/getDefaultThemeColor';
import styled, {css} from 'styled-components';

import {SetTypographyGutter, TypographyStyledProps} from './Typography.types';

const PARAGRAPH_GUTTER = 2;

export const Typography = styled.span<TypographyStyledProps>`
  display: ${({$display}) => $display};
  color: ${({theme, $color}) => getDefaultThemeColor(theme, $color)};
  text-align: ${({$align}) => $align};
  white-space: ${({$noWrap, $ellipsisTextOverflow}) =>
    $noWrap || $ellipsisTextOverflow ? 'nowrap' : null};
  text-overflow: ${({$ellipsisTextOverflow}) =>
    $ellipsisTextOverflow ? 'ellipsis' : null};
  overflow: ${({$ellipsisTextOverflow}) =>
    $ellipsisTextOverflow ? 'hidden' : null};
  ${({theme, $variant}) => theme.typography.variants[$variant]};
  ${setTypographyGutter};
  text-decoration: ${({$underline}) =>
    $underline === 'always' ? 'underline' : 'none'};
  &:hover {
    text-decoration: ${({$underline}) =>
      $underline === 'hover' ? 'underline' : null};
  }
  ${({sx}) => sx};
`;

function setTypographyGutter({
  theme,
  $gutter,
  $gutterTop,
  $gutterBottom,
  $gutterLeft,
  $gutterRight,
  $paragraph,
}: SetTypographyGutter) {
  if (
    $gutterTop &&
    !($gutter || $gutterBottom || $gutterLeft || $gutterRight || $paragraph)
  ) {
    return css`
      margin-top: ${theme.spacing($gutterTop)};
    `;
  }

  if (
    $gutterRight &&
    !($gutter || $gutterBottom || $gutterLeft || $gutterTop || $paragraph)
  ) {
    return css`
      margin-right: ${theme.spacing($gutterRight)};
    `;
  }

  if (
    ($gutterBottom || $paragraph) &&
    !($gutter || $gutterTop || $gutterLeft || $gutterRight)
  ) {
    return css`
      margin-bottom: ${theme.spacing($gutterBottom || PARAGRAPH_GUTTER)};
    `;
  }

  if (
    $gutterLeft &&
    !($gutter || $gutterBottom || $gutterTop || $gutterRight || $paragraph)
  ) {
    return css`
      margin-left: ${theme.spacing($gutterLeft)};
    `;
  }

  if (
    $gutter &&
    !($gutterTop || $gutterBottom || $gutterLeft || $gutterRight || $paragraph)
  ) {
    return css`
      margin: ${theme.spacing($gutter)};
    `;
  }

  if (
    $gutterTop ||
    $gutterBottom ||
    $gutterLeft ||
    $gutterRight ||
    $paragraph
  ) {
    const gutterTop = $gutterTop || $gutter;
    const gutterRight = $gutterRight || $gutter;
    const gutterBottom =
      $gutterBottom || ($paragraph ? PARAGRAPH_GUTTER : null) || $gutter;
    const gutterLeft = $gutterLeft || $gutter;

    const finalGutterTop = gutterTop ? theme.spacing(gutterTop) : 0;
    const finalGutterRight = gutterRight ? theme.spacing(gutterRight) : 0;
    const finalGutterBottom = gutterBottom ? theme.spacing(gutterBottom) : 0;
    const finalGutterLeft = gutterLeft ? theme.spacing(gutterLeft) : 0;

    return css`
      margin: ${`${finalGutterTop}
        ${finalGutterRight}
        ${finalGutterBottom}
        ${finalGutterLeft}`};
    `;
  }
  return null;
}
