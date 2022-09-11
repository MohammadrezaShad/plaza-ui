import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import * as S from './TableContainer.styled';
import {
  getTableContainerUtilityClass,
  TableContainerClasses,
} from './tableContainerClasses';

type TableContainerProps = {
  children?: ReactNode;
  component?: Component;
  sx?: SxType;
  className?: string;
  classes?: Partial<TableContainerClasses>;
};

const useUtilityClasses = (
  ownerState: Pick<TableContainerProps, 'classes'>,
) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTableContainerUtilityClass, classes);
};

const TableContainerProps = forwardRef<
  HTMLTableSectionElement,
  TableContainerProps
>(
  (
    {children, component, sx, className, classes: inputClasses, ...props},
    ref,
  ) => {
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({classes: inputClasses});

    return (
      <S.TableContainer
        className={clsx(classes.root, className)}
        as={component}
        ref={ref}
        sx={sxStyles}
        {...props}
      >
        {children}
      </S.TableContainer>
    );
  },
);

TableContainerProps.displayName = 'TableContainerProps';
export default TableContainerProps;
