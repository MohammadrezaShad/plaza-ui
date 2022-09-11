/* Utils */
import {off, on} from '@plaza-ui/utils/lib/main';
import {RefObject, useEffect, useState} from 'react';

export interface MouseState {
  docX: number;
  docY: number;
  posX: number;
  posY: number;
  elX: number;
  elY: number;
  elH: number;
  elW: number;
}

export const useMouse = (ref: RefObject<Element>): MouseState => {
  if (process.env.NODE_ENV === 'development') {
    if (typeof ref !== 'object' || typeof ref.current === 'undefined') {
      // eslint-disable-next-line no-console
      console.error('[Plaza-UI] : useMouse expects a single ref argument.');
    }
  }

  const [state, setState] = useState<MouseState>({
    docX: 0,
    docY: 0,
    posX: 0,
    posY: 0,
    elX: 0,
    elY: 0,
    elH: 0,
    elW: 0,
  });

  useEffect(() => {
    const moveHandler = (event: MouseEvent) => {
      if (ref && ref.current) {
        const {
          left,
          top,
          width: elW,
          height: elH,
        } = ref.current.getBoundingClientRect();
        const posX = left + window.pageXOffset;
        const posY = top + window.pageYOffset;
        const elX = event.pageX - posX;
        const elY = event.pageY - posY;

        setState({
          docX: event.pageX,
          docY: event.pageY,
          posX,
          posY,
          elX,
          elY,
          elH,
          elW,
        });
      }
    };

    on(document, 'mousemove', moveHandler);

    return () => {
      off(document, 'mousemove', moveHandler);
    };
  }, [ref]);

  return state;
};
