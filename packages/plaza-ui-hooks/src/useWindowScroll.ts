/* eslint-disable @typescript-eslint/no-shadow */
/* Utils */
import {isBrowser, off, on} from '@plaza-ui/utils/lib/main';
import {useEffect, useState} from 'react';

export interface WindowScrollState {
  x: number;
  y: number;
}

export const useWindowScroll = (): WindowScrollState => {
  const [state, setState] = useState<WindowScrollState>(() => ({
    x: isBrowser ? window.pageXOffset : 0,
    y: isBrowser ? window.pageYOffset : 0,
  }));

  useEffect(() => {
    const handler = () => {
      setState(state => {
        const {pageXOffset, pageYOffset} = window;

        return state.x !== pageXOffset || state.y !== pageYOffset
          ? {
              x: pageXOffset,
              y: pageYOffset,
            }
          : state;
      });
    };

    handler();

    on(window, 'scroll', handler, {
      capture: false,
      passive: true,
    });

    return () => {
      off(window, 'scroll', handler);
    };
  }, []);

  return state;
};
