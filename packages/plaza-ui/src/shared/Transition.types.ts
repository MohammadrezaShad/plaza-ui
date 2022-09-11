import {CSSProperties, ReactNode} from 'react';

import {Component} from './Main.types';

export interface TransitionTimeout {
  enter: number;
  exit: number;
}

export type TransitionProps = {
  children?: ReactNode;
  transition?: TransitionTimeout;
  in: boolean;
  component?: Component;
  unmountOnExit?: boolean;
  mountOnEnter?: boolean;
  appear?: boolean;
  style?: CSSProperties;
  onEnter?: (node: HTMLElement, isAppearing?: boolean) => void;
  onEntered?: (node: HTMLElement, isAppearing?: boolean) => void;
  onEntering?: (node: HTMLElement, isAppearing?: boolean) => void;
  onExit?: (node: HTMLElement, isAppearing?: boolean) => void;
  onExited?: (node: HTMLElement, isAppearing?: boolean) => void;
  onExiting?: (node: HTMLElement, isAppearing?: boolean) => void;
};
