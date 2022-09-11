import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import * as S from './Image.styled';
import {getImageUtilityClass, ImageClasses} from './imageClasses';

export type ImageLayout = 'fixed' | 'responsive';
export type ImageObjectFit =
  | 'contain'
  | 'cover'
  | 'none'
  | 'scale-down'
  | 'inherit'
  | 'initial'
  | 'revert'
  | 'unset';

export type ImageProps = {
  children?: ReactNode;
  component?: Component;
  wrapComponent?: Component;
  alt?: string;
  src: string | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  height?: number;
  width?: number;
  layout?: ImageLayout;
  objectPosition?: string;
  objectFit?: ImageObjectFit;
  sx?: SxType;
  classes?: Partial<ImageClasses>;
} & React.HTMLAttributes<HTMLImageElement>;

const useUtilityClasses = (ownerState: Pick<ImageProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
    wrap: ['wrap'],
  };

  return composeClasses(slots, getImageUtilityClass, classes);
};

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      children,
      src,
      alt,
      height,
      width,
      layout = 'fixed',
      objectFit,
      objectPosition,
      component,
      wrapComponent,
      sx,
      className,
      classes: inputClasses,
      ...otherProps
    },
    ref,
  ) => {
    const sxStyles = useSxProp(sx);
    const ownerState = {
      classes: inputClasses,
    };

    const classes = useUtilityClasses(ownerState);
    return (
      <S.Wrap
        className={classes.wrap}
        as={wrapComponent}
        $height={height}
        $width={width}
        $layout={layout}
        sx={sxStyles}
      >
        <S.Image
          className={clsx(classes.root, className)}
          as={component}
          src={src}
          alt={alt}
          ref={ref}
          height={height}
          width={width}
          $layout={layout}
          $objectPosition={objectPosition}
          $objectFit={objectFit}
          {...otherProps}
        />
        {children}
      </S.Wrap>
    );
  },
);

Image.displayName = 'Image';

export default Image;
