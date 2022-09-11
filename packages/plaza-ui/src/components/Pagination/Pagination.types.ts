import React, {ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';

export type PaginationColor = 'primary' | 'secondary' | 'standard';
export type PaginationSize = 'small' | 'medium' | 'large';
export type PaginationVariant = 'outlined' | 'text';
export type PaginationShape = 'round' | 'rounded';
export type PaginationItemType =
  | 'page'
  | 'first'
  | 'last'
  | 'next'
  | 'previous'
  | 'start-ellipsis'
  | 'end-ellipsis';

type SharedTypes = {
  color?: PaginationColor;
  page?: number;
  shape?: PaginationShape;
  size?: PaginationSize;
  variant?: PaginationVariant;
  disabled?: boolean;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
};

export type PaginationProps = {
  boundaryCount?: number;
  count?: number;
  defaultPage?: number;
  disabled?: boolean;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
  renderItem?: (props: PaginationItemProps) => ReactNode;
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  sx?: SxType;
} & SharedTypes;

export type PaginationItemProps = {
  component?: Component;
  selected?: boolean;
  type?: PaginationItemType | string;
  onClick?: (event: React.MouseEvent) => void;
  sx?: SxType;
} & SharedTypes;

export interface UsePaginationProps {
  boundaryCount?: number;
  componentName?: string;
  count?: number;
  defaultPage?: number;
  disabled?: boolean;
  hideNextButton?: boolean;
  hidePrevButton?: boolean;
  onChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  page?: number;
  showFirstButton?: boolean;
  showLastButton?: boolean;
  siblingCount?: number;
}
