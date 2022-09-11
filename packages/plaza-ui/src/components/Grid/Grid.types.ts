import {Breakpoint} from '@plaza-ui/styles/lib/createBreakpoints';
import {ReactNode} from 'react';
import {CSSObject} from 'styled-components';

import {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import {GridClasses} from './gridClasses';

export type JustifyContent =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export type AlignContent =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'stretch';

export type AlignItems =
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'baseline'
  | 'stretch';

export type FlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type Wrap = 'nowrap' | 'wrap' | 'wrap-reverse';

export type CloumnsValue = false | 'auto' | true;

export type ColumnsNumbers =
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | '1'
  | '2'
  | '3'
  | '4'
  | '5'
  | '6'
  | '7'
  | '8'
  | '9'
  | '10'
  | '11'
  | '12';

export type GridBreakpoint = ColumnsNumbers | CloumnsValue;
export type GridBreakpoints = Partial<Record<Breakpoint, GridBreakpoint>>;
export type GridSpacingBreakpoints = Partial<Record<Breakpoint, number>>;

export type GridProps = {
  container?: boolean;
  item?: boolean;
  children?: ReactNode;
  justify?: JustifyContent;
  alignItems?: AlignItems;
  alignContent?: AlignContent;
  direction?: FlexDirection;
  wrap?: Wrap;
  zeroMinWidth?: boolean;
  component?: Component;
  xxs?: GridBreakpoint;
  xs?: GridBreakpoint;
  sm?: GridBreakpoint;
  md?: GridBreakpoint;
  lg?: GridBreakpoint;
  xlg?: GridBreakpoint;
  xxlg?: GridBreakpoint;
  spacing?: number | GridSpacingBreakpoints;
  sx?: SxType;
  className?: string;
  classes?: Partial<GridClasses>;
};

export type GridStyledProps = Omit<GridProps, 'spacing'> & {
  $spacing?: number | GridSpacingBreakpoints;
} & {sx?: CSSObject};
