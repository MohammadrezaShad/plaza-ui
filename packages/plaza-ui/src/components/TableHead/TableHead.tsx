import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import {TableHeadContext} from './TableHead.helpers';
import * as S from './TableHead.styled';
import {getTableHeadUtilityClass, TableHeadClasses} from './tableHeadClasses';

type TableHeadProps = {
  children?: ReactNode;
  component?: Component;
  sx?: SxType;
  className?: string;
  classes?: Partial<TableHeadClasses>;
};

const useUtilityClasses = (ownerState: Pick<TableHeadProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableHeadUtilityClass, classes);
};

const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  (
    {children, component, sx, className, classes: inputClasses, ...props},
    ref,
  ) => {
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({classes: inputClasses});

    return (
      <S.THead
        className={clsx(classes.root, className)}
        as={component}
        ref={ref}
        sx={sxStyles}
        {...props}
      >
        <TableHeadContext.Provider value={{isHead: true}}>
          {children}
        </TableHeadContext.Provider>
      </S.THead>
    );
  },
);

TableHead.displayName = 'TableHead';
export default TableHeadProps;
