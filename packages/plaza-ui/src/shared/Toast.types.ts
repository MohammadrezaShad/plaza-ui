import {ReactNode} from 'react';

/* eslint-disable @typescript-eslint/ban-types */
export interface ToastProps {
  onOpen?: <T = {}>(props: T) => void;
  onClose?: <T = {}>(props: T) => void;
  onClick?: (event: React.MouseEvent) => void;
  closeToast: () => void;
  draggableDirection?: Direction.X | Direction.Y;
  draggablePercent: number;
  draggable?: boolean;
  pauseOnFocusLoss?: boolean;
  pauseOnHover?: boolean;
  type?: TypeOptions;
  toastId?: Id;
  updateId?: Id;
  closeOnClick?: boolean;
  autoClose?: number | false;
  position?: ToastPosition;
  children?: ReactNode;
  transition: ToastTransition;
}
export type Id = number | string;

export type ToastTransition = 'Fade' | 'Slide';

export type TypeOptions = 'info' | 'success' | 'warning' | 'error';

export type ToastPosition =
  | 'top-right'
  | 'top-center'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-center'
  | 'bottom-left';

type KeyOfPosition =
  | 'TOP_LEFT'
  | 'TOP_RIGHT'
  | 'TOP_CENTER'
  | 'BOTTOM_LEFT'
  | 'BOTTOM_RIGHT'
  | 'BOTTOM_CENTER';

type KeyOfType = 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR';

export const POSITION: {[key in KeyOfPosition]: ToastPosition} = {
  TOP_LEFT: 'top-left',
  TOP_RIGHT: 'top-right',
  TOP_CENTER: 'top-center',
  BOTTOM_LEFT: 'bottom-left',
  BOTTOM_RIGHT: 'bottom-right',
  BOTTOM_CENTER: 'bottom-center',
};

export const TYPE: {[key in KeyOfType]: TypeOptions} = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

export const enum Direction {
  X = 'x',
  Y = 'y',
}
