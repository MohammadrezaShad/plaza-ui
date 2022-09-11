import {Meta, Story} from '@storybook/react';
import React, {FC, useRef} from 'react';
import styled from 'styled-components';

import {useCarousel} from '../hooks/useCarousel/useCarousel';

const SliderWrap = styled.div`
  position: relative;
  width: 100px;
  margin: 0 auto;
  overflow: hidden;
  white-space: nowrap;
`;

const SliderContent = styled.div<{$translate: string; $transition: number}>`
  height: 100%;
  display: flex;
  transform: translateX(${({$translate}) => `${$translate}`});
  transition: transform ${({$transition}) => $transition}s;
`;

const Slide = styled.div`
  width: 100px;
  height: 100px;
  background: red;
  border: 1px solid;
  flex-shrink: 0;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

const Carousel: FC = ({children}) => {
  const slideRef = useRef<HTMLDivElement>(null);

  const {
    _slides,
    sliderRef,
    transition,
    translate,
    nextSlide,
    prevSlide,
    goSlide,
    setIsPaused,
    sliderContentClassName,
  } = useCarousel({
    slideRef,
    children,
    transition: 1.45,
    autoPlay: 2000,
    defaultActiveSlide: 0,
  });

  return (
    <SliderWrap
      ref={sliderRef as React.RefObject<HTMLDivElement>}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <SliderContent
        $translate={translate}
        $transition={transition}
        ref={slideRef}
        className={sliderContentClassName}
      >
        {_slides.map((slide: any) => slide)}
      </SliderContent>
      {Array.from({length: React.Children.count(children)}, (v, i) => i).map(
        item => (
          <Dot
            key={Math.random()}
            type="button"
            onClick={() => goSlide(item)}
          />
        ),
      )}
      <ButtonWrap>
        <button type="button" onClick={() => nextSlide()}>
          Next
        </button>
        <button type="button" onClick={() => prevSlide()}>
          Prev
        </button>
      </ButtonWrap>
    </SliderWrap>
  );
};

const Dot = styled.button`
  background-color: red;
  width: 10px;
  height: 10px;
  margin: 8px;
  border-radius: 50%;
`;

export default {
  title: 'Lab/Carousel',
  component: Carousel,
  argTypes: {},
} as Meta;

const Template: Story = args => (
  <Carousel>
    <Slide>1</Slide>
  </Carousel>
);

export const CarouselTemp = Template.bind({});

CarouselTemp.args = {};
