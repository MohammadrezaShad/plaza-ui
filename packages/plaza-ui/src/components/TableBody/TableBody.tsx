import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import * as S from './TableBody.styled';
import {getTableBodyUtilityClass, TableBodyClasses} from './tableBodyClasses';

export type TableBodyProps = {
  children?: ReactNode;
  component?: Component;
  className?: string;
  classes?: Partial<TableBodyClasses>;
  sx?: SxType;
};
const useUtilityClasses = (ownerState: Pick<TableBodyProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableBodyUtilityClass, classes);
};

const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  (
    {children, component, sx, className, classes: inputClasses, ...props},
    ref,
  ) => {
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({classes: inputClasses});

    return (
      <S.TableBody
        className={clsx(classes.root, className)}
        as={component}
        ref={ref}
        sx={sxStyles}
        {...props}
      >
        {children}
      </S.TableBody>
    );
  },
);

TableBody.displayName = 'TableBody';

export default TableBody;
