/* eslint-disable no-underscore-dangle */
import {Action, ActionTypes, State} from './useCarousel.types';

export const sliderReducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.RESET:
      return {
        ...state,
        transition: action.payload.transition,
        transitioning: false,
      };
    case ActionTypes.SMOOTH:
      return {
        ...state,
        _slides: action.payload._slides,
        transition: 0,
        translate: '100%',
      };
    case ActionTypes.THROTTLE:
      return {
        ...state,
        transitioning: true,
      };
    case ActionTypes.REPLACE_SLIDES:
      return {
        ...state,
        _slides: action.payload._slides,
        transition: 0,
      };
    case ActionTypes.GOSLIDE:
      return {
        ...state,
        _slides: action.payload._slides,
        activeSlide: action.payload.activeSlide,
        translate: action.payload.translate,
      };
    case ActionTypes.NEXT:
      return {
        ...state,
        translate: '200%',
        activeSlide:
          state.activeSlide === action.payload.slidesLength - 1
            ? 0
            : state.activeSlide + 1,
      };
    case ActionTypes.PREV:
      return {
        ...state,
        translate: '0',
        activeSlide:
          state.activeSlide === 0
            ? action.payload.slidesLength - 1
            : state.activeSlide - 1,
      };
    default:
      return state;
  }
};
