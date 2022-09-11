import * as React from 'react';
import {
  TransitionActions,
  TransitionProps as _TransitionProps,
} from 'react-transition-group/Transition';

export type TransitionHandlerKeys =
  | 'onEnter'
  | 'onEntering'
  | 'onEntered'
  | 'onExit'
  | 'onExiting'
  | 'onExited';
export type TransitionHandlerProps = Pick<
  _TransitionProps,
  TransitionHandlerKeys
>;

export interface EasingProps {
  easing: string | {enter?: string; exit?: string};
}

export type TransitionKeys =
  | 'in'
  | 'mountOnEnter'
  | 'unmountOnExit'
  | 'timeout'
  | 'easing'
  | 'addEndListener'
  | TransitionHandlerKeys;
export interface TransitionProps
  extends TransitionActions,
    Partial<Pick<_TransitionProps & EasingProps, TransitionKeys>>,
    React.HTMLAttributes<HTMLElement> {}
