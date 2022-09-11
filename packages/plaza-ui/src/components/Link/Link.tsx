import React, {forwardRef, Ref} from 'react';
import {Link as RouteLink} from 'react-router-dom';

import Typography from '../Typography';
import {TypographyProps} from '../Typography/Typography.types';

export type LinkProps = TypographyProps;

const Link = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      color = 'primary',
      variant = 'caption',
      component = RouteLink,
      ...restProps
    }: LinkProps,
    ref: Ref<T>,
  ) => (
    <Typography
      component={component}
      ref={ref}
      variant={variant}
      color={color}
      {...restProps}
    >
      {children}
    </Typography>
  ),
);

Link.displayName = 'Link';

export default Link;
