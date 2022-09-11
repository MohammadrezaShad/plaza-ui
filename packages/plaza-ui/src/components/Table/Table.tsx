import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode, useState} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import {TableContext} from './Table.helpers';
import * as S from './Table.styled';
import {getTableUtilityClass, TableClasses} from './tableClasses';

export type TableSize = 'medium' | 'small';
export type TablePadding = 'normal' | 'none';

export type TableProps = {
  children?: ReactNode;
  component?: Component;
  stickyHeader?: boolean;
  size?: TableSize;
  padding?: TablePadding;
  sx?: SxType;
  className?: string;
  classes?: Partial<TableClasses>;
};

const useUtilityClasses = (ownerState: Pick<TableProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableUtilityClass, classes);
};

const Table = forwardRef<HTMLTableElement, TableProps>(
  (
    {
      children,
      component,
      padding = 'normal',
      size = 'medium',
      stickyHeader = false,
      sx,
      className,
      classes: inputClasses,
      ...props
    },
    ref,
  ) => {
    const [state] = useState({
      padding,
      size,
      stickyHeader,
    });
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({classes: inputClasses});

    return (
      <S.Table
        className={clsx(classes.root, className)}
        as={component}
        ref={ref}
        sx={sxStyles}
        {...props}
      >
        <TableContext.Provider value={{...state}}>
          {children}
        </TableContext.Provider>
      </S.Table>
    );
  },
);

Table.displayName = 'Table';

export default Table;
