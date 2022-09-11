/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';

import {sliderReducer} from './useCarousel.reducer';
import {ActionTypes, State, UseSlider} from './useCarousel.types';

const sliderContentClassName = 'sliderContent';

export const initialSliderState: State = {
  activeSlide: 0,
  translate: '100%',
  transition: 0.45,
  transitioning: false,
  _slides: [],
};

export const useCarousel = <U extends HTMLElement>({
  children,
  autoPlay,
  slideRef,
  transition: inputTransition,
  defaultActiveSlide = 0,
}: UseSlider) => {
  const slides = React.Children.toArray(children);

  const cloneSlides = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return null;
    }
    return React.cloneElement(child, {key: Math.random()});
  });

  const firstSlide = slides[0];
  const secondSlide = slides[1];
  const lastSlide = slides[slides.length - 1];
  const cloneFirstSlide = cloneSlides?.[0];
  const cloneSecondSlide = cloneSlides?.[1];

  const firstIntialSlide = slides[defaultActiveSlide];
  const secondIntialSlide =
    slides[
      defaultActiveSlide + 1 > slides.length - 1 ? 0 : defaultActiveSlide + 1
    ];
  const lastIntialSlide =
    slides[
      defaultActiveSlide - 1 < 0 ? slides.length - 1 : defaultActiveSlide - 1
    ];

  const smallSlides =
    defaultActiveSlide === 0
      ? [cloneSecondSlide, firstSlide, secondSlide]
      : [firstSlide, secondSlide, cloneFirstSlide];

  const normalSlides = [lastIntialSlide, firstIntialSlide, secondIntialSlide];
  const initSlides = slides.length < 3 ? [...smallSlides] : [...normalSlides];
  const [isPaused, setIsPaused] = useState(false);
  const [state, dispatch] = useReducer(sliderReducer, {
    ...initialSliderState,
    activeSlide: defaultActiveSlide,
    translate: slides.length <= 1 ? '0%' : '100%',
    _slides: [...initSlides],
    transition: inputTransition || initialSliderState.transition,
  });

  const {activeSlide, transition, transitioning, translate, _slides} = state;

  const sliderRef = useRef<U>();
  const intervalRef = useRef<ReturnType<typeof setTimeout>>();

  const smoothTransition = useCallback(() => {
    const width = slideRef.current?.clientWidth;
    let _newSlides: ReactNode[] = [];

    if (slides.length === 1 || !width) return;
    if (slides.length < 3) {
      _newSlides = [...getExceptionSlides()];
    } else {
      _newSlides = [...getSlides()];
    }

    dispatch({
      type: ActionTypes.SMOOTH,
      payload: {_slides: _newSlides},
    });
  }, [activeSlide]);

  function getExceptionSlides() {
    let _newSlides: ReactNode[] = [];

    if (activeSlide === slides.length - 1) {
      _newSlides = [cloneFirstSlide, lastSlide, firstSlide];
    } else if (activeSlide === 0) {
      _newSlides = [lastSlide, firstSlide, cloneSecondSlide];
    }
    return _newSlides;
  }

  function getSlides() {
    let _newSlides: ReactNode[] = [];

    if (activeSlide === slides.length - 1)
      _newSlides = [slides[slides.length - 2], lastSlide, firstSlide];
    else if (activeSlide === 0)
      _newSlides = [lastSlide, firstSlide, secondSlide];
    else _newSlides = slides.slice(activeSlide - 1, activeSlide + 2);

    return _newSlides;
  }

  const throttleArrows = useCallback(() => {
    dispatch({type: ActionTypes.THROTTLE});
  }, []);

  const nextSlide = useCallback(() => {
    if (transitioning || slides.length === 1) {
      return;
    }
    dispatch({
      type: ActionTypes.NEXT,
      payload: {
        slidesLength: slides.length,
      },
    });
  }, [transitioning, activeSlide]);

  useEffect(() => {
    const slider = sliderRef.current;

    const smooth = (event: TransitionEvent) => {
      const element = event.target as HTMLElement;
      const hasContentClass = element.classList.contains(
        sliderContentClassName,
      );
      if (hasContentClass && event.propertyName === 'transform') {
        smoothTransition();
      }
    };

    const throttle = (event: TransitionEvent) => {
      const element = event.target as HTMLElement;

      const hasContentClass = element.classList.contains(
        sliderContentClassName,
      );
      if (hasContentClass && event.propertyName === 'transform') {
        throttleArrows();
      }
    };

    slider?.addEventListener('transitionstart', throttle);
    slider?.addEventListener('transitionend', smooth);

    return () => {
      slider?.removeEventListener('transitionstart', throttle);
      slider?.removeEventListener('transitionend', smooth);
    };
  }, [smoothTransition, throttleArrows]);

  useEffect(() => {
    if (transition === 0)
      dispatch({
        type: ActionTypes.RESET,
        payload: {transition: inputTransition || initialSliderState.transition},
      });
  }, [transition]);

  useEffect(() => {
    const play = () => {
      if (isPaused) return;
      nextSlide();
    };

    if (autoPlay) {
      intervalRef.current = setInterval(play, autoPlay);
    }

    return () => {
      if (autoPlay) {
        intervalRef.current && clearInterval(intervalRef.current);
      }
    };
  }, [nextSlide, isPaused]);

  const prevSlide = () => {
    if (transitioning || slides.length === 1) {
      return;
    }
    dispatch({type: ActionTypes.PREV, payload: {slidesLength: slides.length}});
  };

  const goSlide = (targetSlideIndex: number) => {
    intervalRef.current && clearInterval(intervalRef.current);
    if (
      transitioning ||
      targetSlideIndex === activeSlide ||
      slides.length === 1
    ) {
      return;
    }

    if (slides.length < 3) {
      if (targetSlideIndex > activeSlide) {
        return nextSlide();
      }
      return prevSlide();
    }

    const _newSlides = [...getCorrectSlides(targetSlideIndex)];

    dispatch({
      type: ActionTypes.REPLACE_SLIDES,
      payload: {_slides: _newSlides},
    });

    setTimeout(() => {
      dispatch({
        type: ActionTypes.GOSLIDE,
        payload: {
          _slides: _newSlides,
          activeSlide: targetSlideIndex,
          translate: targetSlideIndex > activeSlide ? '200%' : '0',
        },
      });
    }, 0);
  };

  function getCorrectSlides(targetSlideIndex: number) {
    let newSlides: ReactNode[] = [];

    if (targetSlideIndex > activeSlide) {
      newSlides = [...getForwardMoveSlides(targetSlideIndex)];
    } else if (targetSlideIndex < activeSlide) {
      newSlides = [...getBackwardMoveSlides(targetSlideIndex)];
    }

    return newSlides;
  }

  const getForwardMoveSlides = (targetSlideIndex: number) => {
    let newSlides: ReactNode[] = [];
    newSlides = [
      cloneFirstSlide,
      slides[activeSlide],
      slides[targetSlideIndex],
    ];
    return newSlides;
  };

  const getBackwardMoveSlides = (targetSlideIndex: number) => {
    let newSlides: ReactNode[] = [];
    newSlides = [
      slides[targetSlideIndex],
      slides[activeSlide],
      cloneFirstSlide,
    ];
    return newSlides;
  };

  return {
    prevSlide,
    nextSlide,
    activeSlide,
    transition,
    transitioning,
    translate,
    slides,
    _slides,
    sliderRef,
    sliderContentClassName,
    goSlide,
    setIsPaused,
    isPaused,
  };
};
