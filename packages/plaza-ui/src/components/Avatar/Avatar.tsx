/* eslint-disable prefer-destructuring */
import Person from '@plaza-ui/icons/lib/Person';
import {DefaultColor} from '@plaza-ui/styles/lib/createColors';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import * as S from './Avatar.styled';
import {AvatarClasses, getAvatarUtilityClass} from './avatarClasses';

const useUtilityClasses = (
  ownerState: Pick<AvatarProps, 'classes' | 'variant'> & {colorDefault: any},
) => {
  const {classes, variant, colorDefault} = ownerState;

  const slots = {
    root: ['root', variant, colorDefault && 'colorDefault'],
    img: ['img'],
    fallback: ['fallback'],
  };

  return composeClasses(slots, getAvatarUtilityClass, classes);
};

export type AvatarVariant = 'circular' | 'rounded' | 'square';
export type AvatarSize = 'small' | 'medium' | 'large';

export type AvatarProps = {
  component?: Component;
  alt?: string;
  children?: React.ReactNode;
  clasName?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
  src?: string;
  srcSet?: string;
  variant?: AvatarVariant;
  size?: AvatarSize;
  bgColor?: DefaultColor | string;
  width?: number;
  height?: number;
  sx?: SxType;
  className?: string;
  classes?: Partial<AvatarClasses>;
};

export type UseLoaded = {
  crossOrigin?: string;
  referrerPolicy?: string;
  src?: string;
  srcSet?: string;
};

function useLoaded({crossOrigin, referrerPolicy, src, srcSet}: UseLoaded) {
  const [loaded, setLoaded] = React.useState<boolean | string>(false);

  React.useEffect(() => {
    if (!src && !srcSet) {
      return undefined;
    }

    setLoaded(false);

    let active = true;
    const image = new Image();
    image.onload = () => {
      if (!active) {
        return;
      }
      setLoaded('loaded');
    };
    image.onerror = () => {
      if (!active) {
        return;
      }
      setLoaded('error');
    };
    image.crossOrigin = crossOrigin as string;
    image.referrerPolicy = referrerPolicy as string;
    image.src = src as string;
    if (srcSet) {
      image.srcset = srcSet;
    }

    return () => {
      active = false;
    };
  }, [crossOrigin, referrerPolicy, src, srcSet]);

  return loaded;
}
const Avatar = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(props: AvatarProps, ref: Ref<T>) => {
    const {
      variant = 'circular',
      component,
      children: childrenProp,
      size = 'medium',
      imgProps,
      alt,
      className,
      src,
      srcSet,
      bgColor,
      height,
      width,
      sx,
      ...otherProps
    } = props;
    let children = null;
    const sxStyles = useSxProp(sx);

    // Use a hook instead of onError on the img element to support server-side rendering.
    const loaded = useLoaded({
      crossOrigin: imgProps?.crossOrigin,
      referrerPolicy: imgProps?.referrerPolicy,
      src,
      srcSet,
    });
    const hasImg = src || srcSet;
    const hasImgNotFailing = hasImg && loaded !== 'error';
    const ownerState = {
      ...props,
      colorDefault: !hasImgNotFailing,
      component,
      variant,
    };

    const classes = useUtilityClasses(ownerState);

    if (hasImgNotFailing) {
      children = (
        <S.AvatarImg
          alt={alt}
          src={src}
          srcSet={srcSet}
          className={classes.img}
          {...imgProps}
        />
      );
    } else if (childrenProp != null) {
      children = childrenProp;
    } else if (hasImg && alt) {
      children = alt[0];
    } else {
      children = (
        <Person
          component={S.AvatarFallback}
          color="danger"
          className={classes.fallback}
        />
      );
    }

    return (
      <S.Avatar
        as={component}
        className={clsx(classes.root, className)}
        $variant={variant}
        $bgColor={bgColor}
        $height={height}
        $width={width}
        $size={size}
        sx={sxStyles}
        ref={ref as Ref<HTMLDivElement>}
        {...otherProps}
      >
        {children}
      </S.Avatar>
    );
  },
);
Avatar.displayName = 'Avatar';

export default Avatar;
