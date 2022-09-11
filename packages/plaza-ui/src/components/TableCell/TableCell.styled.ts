import styled, {css, CSSObject} from 'styled-components';

import {TableCellProps} from './TableCell';

type StyledTableCell = Required<
  Pick<TableCellProps, 'align' | 'padding' | 'size' | 'variant'>
>;

export type TableCellStyledProps = {
  [Property in keyof StyledTableCell as `$${Property}`]: StyledTableCell[Property];
} & {$isHead?: boolean; $stickyHeader?: boolean; sx?: CSSObject};

export const TableTd = styled.td<TableCellStyledProps>`
  display: table-cell;
  padding: ${({theme}) => `${theme.spacing(4)} ${theme.spacing(5)}}`};
  text-align: ${({$align}) => $align};

  ${({theme, $variant}) =>
    $variant === 'head'
      ? theme.typography.variants.subtitle1
      : theme.typography.variants.body1};

  ${({sx}) => sx};
`;

export const TableTh = styled.th<TableCellStyledProps>`
  display: table-cell;
  padding: ${({theme}) => `${theme.spacing(4)} ${theme.spacing(5)}}`};
  text-align: ${({$align}) => $align};
  ${({$stickyHeader}) =>
    $stickyHeader
      ? css`
          position: sticky;
          top: 0;
          z-index: 2;
        `
      : null};
  ${({$isHead, theme}) =>
    $isHead
      ? css`
          background-color: ${theme.colors.backgroundVariant.origin};
          &:first-child {
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
          }
          &:last-child {
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
          }
        `
      : null}
  ${({theme, $variant}) =>
    $variant === 'head'
      ? theme.typography.variants.subtitle1
      : theme.typography.variants.body1};

  ${({sx}) => sx};
`;
