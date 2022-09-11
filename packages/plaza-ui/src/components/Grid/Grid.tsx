import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef} from 'react';

import useSxProp from '../../hooks/useSxProp';
import * as S from './Grid.styled';
import {GridProps, GridSpacingBreakpoints} from './Grid.types';
import {getGridUtilityClass} from './gridClasses';

export function resolveSpacingClasses(
  spacing: number | null | GridSpacingBreakpoints = null,
  container: boolean,
  styles = {} as any,
) {
  // in case of grid item or undefined/null or `spacing` <= 0
  if (!container || !spacing || spacing <= 0) {
    return [];
  }
  // in case of string/number `spacing`
  if (
    (typeof spacing === 'string' && !Number.isNaN(Number(spacing))) ||
    typeof spacing === 'number'
  ) {
    return [
      styles[`spacing-xs-${String(spacing)}`] ||
        `spacing-xs-${String(spacing)}`,
    ];
  }
  // in case of object `spacing`
  const {xxs, xs, sm, md, lg, xlg} = spacing;

  return [
    Number(xxs) > 0 &&
      (styles[`spacing-xs-${String(xxs)}`] || `spacing-xs-${String(xxs)}`),
    Number(xs) > 0 &&
      (styles[`spacing-xs-${String(xs)}`] || `spacing-xs-${String(xs)}`),
    Number(sm) > 0 &&
      (styles[`spacing-sm-${String(sm)}`] || `spacing-sm-${String(sm)}`),
    Number(md) > 0 &&
      (styles[`spacing-md-${String(md)}`] || `spacing-md-${String(md)}`),
    Number(lg) > 0 &&
      (styles[`spacing-lg-${String(lg)}`] || `spacing-lg-${String(lg)}`),
    Number(xlg) > 0 &&
      (styles[`spacing-xl-${String(xlg)}`] || `spacing-xl-${String(xlg)}`),
  ];
}

const useUtilityClasses = (ownerState: GridProps) => {
  const {
    classes,
    container,
    direction,
    item,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xlg,
    xs,
    xxs,
    zeroMinWidth,
  } = ownerState;

  const slots = {
    root: [
      'root',
      container && 'container',
      item && 'item',
      zeroMinWidth && 'zeroMinWidth',
      // ...resolveSpacingClasses(spacing, !!container),
      direction && direction !== 'row' && `direction-xs-${String(direction)}`,
      wrap && wrap !== 'wrap' && `wrap-xs-${String(wrap)}`,
      xxs && `grid-xs-${String(xxs)}`,
      xs && `grid-xs-${String(xs)}`,
      sm && `grid-sm-${String(sm)}`,
      md && `grid-md-${String(md)}`,
      lg && `grid-lg-${String(lg)}`,
      xlg && `grid-xl-${String(xlg)}`,
    ],
  };

  return composeClasses(slots, getGridUtilityClass, classes);
};

const Grid = forwardRef<
  HTMLElement,
  GridProps & React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const {
    container,
    item,
    children,
    justify,
    alignContent,
    alignItems,
    component,
    direction,
    wrap,
    zeroMinWidth,
    xlg,
    lg,
    md,
    sm,
    xs,
    xxs,
    className,
    spacing,
    sx,
    classes: inputClasses,
    ...otherProps
  } = props;
  const sxStyles = useSxProp(sx);
  const ownerState = {
    classes: inputClasses,
    container,
    direction,
    item,
    lg,
    md,
    sm,
    spacing,
    wrap,
    xlg,
    xs,
    xxs,
    zeroMinWidth,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <S.Grid
      as={component}
      className={clsx(classes.root, className)}
      ref={ref}
      container={container}
      item={item}
      justify={justify}
      alignContent={alignContent}
      alignItems={alignItems}
      direction={direction}
      wrap={wrap}
      zeroMinWidth={zeroMinWidth}
      xxs={xxs}
      xs={xs}
      sm={sm}
      md={md}
      lg={lg}
      xlg={xlg}
      $spacing={spacing}
      sx={sxStyles}
      {...otherProps}
    >
      {children}
    </S.Grid>
  );
});

Grid.displayName = 'Grid';

export default Grid;
