import {useEffect, useRef} from 'react';

export const useUnmount = (fn: () => unknown): void => {
  const fnRef = useRef(fn);

  // update the ref each render so if it change the newest callback will be invoked
  fnRef.current = fn;
  useEffect(
    () => () => {
      fnRef.current();
    },
    [],
  );
};
