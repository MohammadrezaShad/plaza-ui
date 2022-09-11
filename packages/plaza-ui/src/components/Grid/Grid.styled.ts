import {Breakpoint} from '@plaza-ui/styles/lib/createBreakpoints';
import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import styled, {css} from 'styled-components';

import {
  GridBreakpoint,
  GridBreakpoints,
  GridProps,
  GridSpacingBreakpoints,
  GridStyledProps,
} from './Grid.types';

const gridColumns = 12;

const autoBreakpointStyles = `
  flex-grow: 0;
  max-width: none;
  flex-basis: auto;
`;

const trueBreakpointStyles = `
  flex-grow: 1;
  max-width: 100%;
  flex-basis: 0;
`;

export const Grid = styled.div<GridStyledProps>`
  ${props => {
    const {container, item} = props;
    return css`
      ${container ? containerGlobalStyles : null};
      ${item ? itemGlobalStyles : null}
    `;
  }}
  ${({sx}) => sx};
`;

function containerGlobalStyles({
  justify,
  alignItems,
  direction,
  wrap,
  $spacing: spacing,
  theme,
  zeroMinWidth,
}: GridStyledProps & {theme: DefaultTheme}) {
  return css`
    display: flex;
    box-sizing: border-box;
    justify-content: ${justify || null};
    align-items: ${alignItems || null};
    flex-direction: ${direction || null};
    flex-wrap: ${wrap || null};
    min-width: ${zeroMinWidth ? 0 : null};
    ${generateSpacing(theme, spacing)};
  `;
}

function itemGlobalStyles({
  alignContent,
  xlg,
  lg,
  md,
  sm,
  xs,
  xxs,
  theme,
}: GridProps & {theme: DefaultTheme}) {
  return css`
    box-sizing: border-box;
    align-content: ${alignContent || null};
    ${generateBreakpoint({xxs, xs, sm, md, lg, xlg}, theme)}
  `;
}

function generateSpacing(
  theme: DefaultTheme,
  spacing?: GridSpacingBreakpoints | number,
) {
  if (!spacing || (spacing && typeof spacing === 'number')) {
    return css`
      width: ${spacing ? `calc(100% + ${theme.spacing(spacing)})` : '100%'};
      margin: ${spacing ? `calc(-${theme.spacing(spacing)} / 2)` : null};
      & > * {
        padding: ${spacing ? `calc(${theme.spacing(spacing)} / 2)` : null};
      }
    `;
  }
  const unSortedbreakpointKeys = Object.keys(spacing) as Breakpoint[];
  const breakpointKeys = getSortedBreakpoints(
    unSortedbreakpointKeys,
    theme,
  ) as Breakpoint[];

  let styles = '';
  breakpointKeys.forEach(breakpointKey => {
    const space = (spacing as GridSpacingBreakpoints)[breakpointKey] as number;
    if (space && typeof space === 'number') {
      const cssMediaQuery = theme.breakpoints.up(breakpointKey);
      styles += `${cssMediaQuery}{${getSpacingStyle(
        (spacing as GridSpacingBreakpoints)[breakpointKey] as number,
        theme,
      )}}`;
    }
  });
  return styles;
}

function getSortedBreakpoints(
  breakpoints: Breakpoint[] = [],
  theme: DefaultTheme,
) {
  const inputBreakppoints = [...breakpoints];
  const sortedBreakpoints = theme.breakpoints.keys;
  const inputBreakppointsMap = inputBreakppoints.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue]: currentValue,
    }),
    {},
  );

  const result = sortedBreakpoints
    .map(key => (inputBreakppointsMap as never)[key])
    .filter(Boolean);
  return [...result];
}

function getSpacingStyle(spacing: number, theme: DefaultTheme) {
  return `
    width: ${spacing ? `calc(100% + ${theme.spacing(spacing)})` : '100%'};
    margin: ${spacing ? `calc(-${theme.spacing(spacing)} / 2)` : null};
    & > * {
      padding: ${spacing ? `calc(${theme.spacing(spacing)} / 2)` : null};
    }
  `;
}

function generateBreakpoint(breakpoints: GridBreakpoints, theme: DefaultTheme) {
  const breakpointKeys = Object.keys(breakpoints) as Breakpoint[];
  let styles = '';
  breakpointKeys.forEach(breakpointKey => {
    if (breakpoints[breakpointKey]) {
      const cssMediaQuery = theme.breakpoints.up(breakpointKey);
      styles += `${cssMediaQuery}{${getBreakpointStyle(
        breakpoints[breakpointKey],
      )}}`;
    }
  });
  return styles;
}

function getBreakpointStyle(breakpointSize?: GridBreakpoint) {
  if (breakpointSize === 'auto') {
    return autoBreakpointStyles;
  }
  if (String(breakpointSize) === 'true') {
    return trueBreakpointStyles;
  }
  if (
    breakpointSize &&
    typeof breakpointSize !== 'boolean' &&
    +breakpointSize >= 1 &&
    +breakpointSize <= gridColumns
  ) {
    return getGridColumnStyle(+breakpointSize);
  }
  return '';
}

function getGridColumnStyle(columnValue: number) {
  return `
  flex-grow: 0;
  max-width: ${getAreaWidth(columnValue)};
  flex-basis: ${getAreaWidth(columnValue)};
`;
}

function getAreaWidth(columnValue: number) {
  return `${
    Math.round(((columnValue / gridColumns) * 100 + Number.EPSILON) * 1000) /
    1000
  }%`;
}
