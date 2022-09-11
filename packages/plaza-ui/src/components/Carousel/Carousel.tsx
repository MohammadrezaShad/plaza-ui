import React, {forwardRef, ReactNode, Ref} from 'react';

import {Component, ReactMouseEvent} from '../../shared';
import * as S from './Carousel.styled';

export type CarouselProps = {
  children?: ReactNode;
  component?: Component;
};

const Carousel = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {children, component}: CarouselProps,
    ref: Ref<T>,
  ) => (
    <S.Carousel as={component} ref={ref as Ref<HTMLDivElement>}>
      {children}
    </S.Carousel>
  ),
);
Carousel.displayName = 'Carousel';

export default Carousel;
