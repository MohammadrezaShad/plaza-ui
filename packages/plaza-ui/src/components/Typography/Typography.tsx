import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef} from 'react';

import useSxProp from '../../hooks/useSxProp';
import * as S from './Typography.styled';
import {TypeographyVariantMapping, TypographyProps} from './Typography.types';
import {getTypographyUtilityClass} from './typographyClasses';

const DEFAULT_VARIANTMAPPING: TypeographyVariantMapping = {
  title1: 'h1',
  title2: 'h1',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  subtitle1: 'h6',
  subtitle2: 'h6',
  body1: 'p',
  body2: 'p',
  button1: 'button',
  button2: 'button',
  button3: 'button',
  caption: 'span',
  overline: 'span',
  link: 'a',
  discount: 'del',
  price1: 'span',
  price2: 'span',
  price3: 'span',
};

const useUtilityClasses = (
  ownerState: Pick<
    TypographyProps,
    'classes' | 'variant' | 'noWrap' | 'paragraph'
  >,
) => {
  const {noWrap, paragraph, variant, classes} = ownerState;

  const slots = {
    root: ['root', variant, noWrap && 'noWrap', paragraph && 'paragraph'],
  };

  return composeClasses(slots, getTypographyUtilityClass, classes);
};

const Typography = forwardRef<HTMLElement, TypographyProps>(
  (
    {
      align,
      children,
      color = 'textPrimary',
      display,
      noWrap,
      paragraph,
      gutter,
      gutterBottom,
      gutterLeft,
      gutterRight,
      gutterTop,
      component,
      variant = 'body1',
      variantMapping = DEFAULT_VARIANTMAPPING,
      text,
      ellipsisTextOverflow,
      to,
      href,
      htmlFor,
      id,
      className,
      underline = 'none',
      sx,
      classes: inputClasses,
      ...props
    },
    ref,
  ) => {
    const sxStyles = useSxProp(sx);
    const ownerState = {
      noWrap,
      paragraph,
      variant,
      classes: inputClasses,
    };

    const Component =
      component ||
      (paragraph
        ? 'p'
        : variantMapping[variant] || DEFAULT_VARIANTMAPPING[variant]) ||
      'span';

    const classes = useUtilityClasses(ownerState);

    return (
      <S.Typography
        as={Component}
        ref={ref}
        to={to}
        href={href}
        htmlFor={htmlFor}
        id={id}
        className={clsx(classes.root, className)}
        $align={align}
        $color={color}
        $display={display}
        $noWrap={noWrap}
        $paragraph={paragraph}
        $gutter={gutter}
        $gutterBottom={gutterBottom}
        $gutterLeft={gutterLeft}
        $gutterRight={gutterRight}
        $gutterTop={gutterTop}
        $variant={variant}
        $ellipsisTextOverflow={ellipsisTextOverflow}
        $underline={underline}
        sx={sxStyles}
        {...props}
      >
        {text}
        {children}
      </S.Typography>
    );
  },
);

export default Typography;

Typography.displayName = 'Typography';
