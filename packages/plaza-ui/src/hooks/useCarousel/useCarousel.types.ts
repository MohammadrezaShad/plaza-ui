import {ReactNode, RefObject} from 'react';

export type UseSlider = {
  children: ReactNode;
  autoPlay?: number;
  slideRef: RefObject<HTMLElement>;
  transition?: number;
  defaultActiveSlide?: number;
};

export enum ActionTypes {
  INIT = 'INIT',
  RESET = 'RESET',
  RESIZE = 'RESIZE',
  THROTTLE = 'THROTTLE',
  SMOOTH = 'SMOOTH',
  NEXT = 'NEXT',
  PREV = 'PREV',
  GOSLIDE = 'GOSLIDES',
  REPLACE_SLIDES = 'REPLACE_SLIDES',
}

export type Action =
  | {type: ActionTypes.RESET; payload: {transition: number}}
  | {type: ActionTypes.THROTTLE}
  | {type: ActionTypes.NEXT; payload: {slidesLength: number}}
  | {type: ActionTypes.PREV; payload: {slidesLength: number}}
  | {
      type: ActionTypes.GOSLIDE;
      payload: {_slides: ReactNode[]; activeSlide: number; translate: string};
    }
  | {
      type: ActionTypes.REPLACE_SLIDES;
      payload: {_slides: ReactNode[]};
    }
  | {type: ActionTypes.SMOOTH; payload: {_slides: ReactNode[]}};

export type State = {
  activeSlide: number;
  translate: string;
  transition: number;
  transitioning: boolean;
  _slides: ReactNode[];
};
