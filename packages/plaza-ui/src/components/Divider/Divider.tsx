import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import * as S from './Divider.styled';
import {DividerClasses, getDividerUtilityClass} from './dividerClasses';

export type DividerTextAlign = 'center' | 'right' | 'left';
export type DividerOrientation = 'horizontal' | 'vertical';
export type DividerVariant = 'fullWidth' | 'inset' | 'middle';

export type DividerProps = {
  children?: ReactNode;
  component?: Component;
  childComponent?: Component;
  absolute?: boolean;
  flexItem?: boolean;
  light?: boolean;
  orientation?: DividerOrientation;
  textAlign?: DividerTextAlign;
  variant?: DividerVariant;
  sx?: SxType;
  classes?: Partial<DividerClasses>;
} & React.HTMLAttributes<HTMLDivElement>;

const useUtilityClasses = (
  ownerState: Pick<
    DividerProps,
    | 'absolute'
    | 'children'
    | 'classes'
    | 'flexItem'
    | 'light'
    | 'orientation'
    | 'textAlign'
    | 'variant'
  >,
) => {
  const {
    absolute,
    children,
    classes,
    flexItem,
    light,
    orientation,
    textAlign,
    variant,
  } = ownerState;

  const slots = {
    root: [
      'root',
      absolute && 'absolute',
      variant,
      light && 'light',
      orientation === 'vertical' && 'vertical',
      flexItem && 'flexItem',
      children && 'withChildren',
      children && orientation === 'vertical' && 'withChildrenVertical',
      textAlign === 'right' && orientation !== 'vertical' && 'textAlignRight',
      textAlign === 'left' && orientation !== 'vertical' && 'textAlignLeft',
    ],
    wrapper: ['wrapper', orientation === 'vertical' && 'wrapperVertical'],
  };

  return composeClasses(slots as any, getDividerUtilityClass, classes);
};

const Divider = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    props: DividerProps,
    ref: Ref<T>,
  ) => {
    const {
      absolute = false,
      children,
      className,
      component = children ? 'div' : 'hr',
      childComponent,
      flexItem = false,
      light = false,
      orientation = 'horizontal',
      role = component !== 'hr' ? 'separator' : undefined,
      textAlign = 'center',
      variant = 'fullWidth',
      sx,
      ...other
    } = props;
    const sxStyles = useSxProp(sx);
    const ownerState = {
      ...props,
      absolute,
      component,
      flexItem,
      light,
      orientation,
      role,
      textAlign,
      variant,
    };

    const classes = useUtilityClasses(ownerState);

    return (
      <S.Divider
        className={clsx(classes.root, className)}
        as={component}
        ref={ref as Ref<HTMLDivElement>}
        role={role}
        sx={sxStyles}
        $absolute={absolute}
        $flexItem={flexItem}
        $light={light}
        $textAlign={textAlign}
        $variant={variant}
        $orientation={orientation}
        $hasChildren={!!children}
        {...other}
      >
        {children ? (
          <S.DividerWrap
            className={classes.wrapper}
            as={childComponent}
            $orientation={orientation}
          >
            {children}
          </S.DividerWrap>
        ) : null}
      </S.Divider>
    );
  },
);
Divider.displayName = 'Divider';

export default Divider;
