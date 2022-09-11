/* eslint-disable @typescript-eslint/no-explicit-any */
/* Utils */
import {isBrowser, off, on} from '@plaza-ui/utils/lib/main';
import {useEffect} from 'react';

export interface ListenerType1 {
  addEventListener(
    name: string,
    handler: (event?: any) => void,
    ...args: any[]
  ): any;

  removeEventListener(
    name: string,
    handler: (event?: any) => void,
    ...args: any[]
  ): any;
}

export interface ListenerType2 {
  on(name: string, handler: (event?: any) => void, ...args: any[]): any;

  off(name: string, handler: (event?: any) => void, ...args: any[]): any;
}

export type UseEventTarget = ListenerType1 | ListenerType2;

const defaultTarget = isBrowser ? window : null;

const isListenerType1 = (target: any): target is ListenerType1 =>
  !!target.addEventListener;
const isListenerType2 = (target: any): target is ListenerType2 => !!target.on;

type AddEventListener<T> = T extends ListenerType1
  ? T['addEventListener']
  : T extends ListenerType2
  ? T['on']
  : never;

export type UseEventOptions<T> = Parameters<AddEventListener<T>>[2];

export const useEvent = <T extends UseEventTarget>(
  name: Parameters<AddEventListener<T>>[0],
  handler?: null | undefined | Parameters<AddEventListener<T>>[1],
  target: null | T | Window = defaultTarget,
  options?: UseEventOptions<T>,
) => {
  useEffect(() => {
    if (!handler) {
      return;
    }
    if (!target) {
      return;
    }
    if (isListenerType1(target)) {
      on(target as Window, name, handler, options);
    } else if (isListenerType2(target)) {
      target.on(name, handler, options);
    }
    return () => {
      if (isListenerType1(target)) {
        off(target as Window, name, handler, options);
      } else if (isListenerType2(target)) {
        target.off(name, handler, options);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, handler, target, JSON.stringify(options)]);
};
