import {off, on} from '@plaza-ui/utils/lib/main';
import {RefObject, useEffect, useState} from 'react';

export interface ScrollState {
  x: number;
  y: number;
}

export const useScroll = (ref: RefObject<HTMLElement>): ScrollState => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      // eslint-disable-next-line no-console
      console.error('[Plaza-UI] : `useScroll` expects a single ref argument.');
    }
  }

  const [state, setState] = useState<ScrollState>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handler = () => {
      if (ref.current) {
        setState({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
        });
      }
    };

    if (ref.current) {
      on(ref.current, 'scroll', handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        off(ref.current, 'scroll', handler);
      }
    };
  }, [ref]);

  return state;
};
