import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import {useTableHeadContext} from '../TableHead/TableHead.helpers';
import * as S from './TableRow.styled';
import {getTableRowUtilityClass, TableRowClasses} from './tableRowClasses';

export type TableRowProps = {
  children?: ReactNode;
  hover?: boolean;
  selected?: boolean;
  sx?: SxType;
  className?: string;
  classes?: Partial<TableRowClasses>;
  component?: Component;
};

const useUtilityClasses = (ownerState: Pick<TableRowProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableRowUtilityClass, classes);
};

const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  (
    {
      children,
      hover,
      selected,
      sx,
      className,
      classes: inputClasses,
      component,
      ...props
    },
    ref,
  ) => {
    const {isHead} = useTableHeadContext();
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({classes: inputClasses});

    return (
      <S.TableRow
        as={component}
        className={clsx(classes.root, className)}
        $isHead={isHead}
        ref={ref}
        $hover={hover}
        $selected={selected}
        sx={sxStyles}
        {...props}
      >
        {children}
      </S.TableRow>
    );
  },
);

TableRow.displayName = 'TableRow';

export default TableRow;
