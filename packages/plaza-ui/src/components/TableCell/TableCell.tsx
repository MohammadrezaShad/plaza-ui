import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import {TablePadding, TableSize} from '../Table/Table';
import {useTableContext} from '../Table/Table.helpers';
import {useTableHeadContext} from '../TableHead/TableHead.helpers';
import * as S from './TableCell.styled';
import {getTableCellUtilityClass, TableCellClasses} from './tableCellClasses';

export type TableCellAlign =
  | 'center'
  | 'inherit'
  | 'justify'
  | 'left'
  | 'right';

export type TableCellVariant = 'body' | 'head';

export type TableCellProps = {
  children?: ReactNode;
  component?: Component;
  align?: TableCellAlign;
  variant?: TableCellVariant;
  size?: TableSize;
  padding?: TablePadding;
  rowSpan?: number;
  colSpan?: number;
  scope?: string;
  sx?: SxType;
  className?: string;
  classes?: Partial<TableCellClasses>;
};

const useUtilityClasses = (ownerState: Pick<TableCellProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableCellUtilityClass, classes);
};

const TableCell = forwardRef<HTMLTableSectionElement, TableCellProps>(
  (
    {
      children,
      component,
      rowSpan,
      colSpan,
      scope,
      align = 'inherit',
      padding,
      size,
      variant,
      sx,
      className,
      classes: inputClasses,
      ...props
    },
    ref,
  ) => {
    const {
      padding: tablePadding,
      size: tableSize,
      stickyHeader,
    } = useTableContext();
    const {isHead} = useTableHeadContext();
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({classes: inputClasses});

    const Content = isHead ? S.TableTh : S.TableTd;
    return (
      <Content
        className={clsx(classes.root, className)}
        as={component}
        ref={ref}
        $align={align}
        $size={size || tableSize}
        $padding={padding || tablePadding}
        $variant={variant || isHead ? 'head' : 'body'}
        $stickyHeader={stickyHeader}
        rowSpan={rowSpan}
        colSpan={colSpan}
        scope={scope}
        $isHead={isHead}
        sx={sxStyles}
        {...props}
      >
        {children}
      </Content>
    );
  },
);

TableCell.displayName = 'TableCell';
export default TableCell;
