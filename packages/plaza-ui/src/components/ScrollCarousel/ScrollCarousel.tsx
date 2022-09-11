import React, {Children, FC} from 'react';

import * as S from './ScrollCarousel.styled';

type ScrollCarouselProp = {
  children: unknown;
  hasScroll?: boolean;
};

const ScrollCarousel: FC<ScrollCarouselProp> = ({children, hasScroll}) => {
  const carouselSlides = Children.toArray(children);
  return (
    <S.Wrap $hasScroll={hasScroll}>
      {carouselSlides.map(carouselSlide => carouselSlide)}
    </S.Wrap>
  );
};

export default ScrollCarousel;
