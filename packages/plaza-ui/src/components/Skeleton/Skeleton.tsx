import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import * as S from './Skeleton.styled';
import {getSkeletonUtilityClass, SkeletonClasses} from './skeletonClasses';

export type SkeletonVariant = 'text' | 'rect' | 'circle';
export type SkeletonAnimation = 'pulse' | 'wave' | false;
export type SekeletonHeight = number | string;
export type SekeletonWidth = number | string;

export type SkeletonProps = {
  component?: Component;
  children?: ReactNode;
  animation?: SkeletonAnimation;
  variant?: SkeletonVariant;
  height?: SekeletonHeight;
  width?: SekeletonWidth;
  sx?: SxType;
  className?: string;
  classes?: Partial<SkeletonClasses>;
};
const useUtilityClasses = (ownerState: Pick<SkeletonProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getSkeletonUtilityClass, classes);
};

const Skeleton = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      animation = 'wave',
      height,
      variant = 'text',
      width,
      component,
      sx,
      className,
      classes: inputClasses,
    }: SkeletonProps,
    ref: Ref<T>,
  ) => {
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({classes: inputClasses});

    return (
      <S.Skeleton
        className={clsx(classes.root, className)}
        as={component}
        ref={ref}
        $animation={animation}
        $variant={variant}
        $height={height}
        $width={width}
        $hasChildren={!!children}
        sx={sxStyles}
      >
        {children}
      </S.Skeleton>
    );
  },
);

Skeleton.displayName = 'Skeleton';

export default Skeleton;
