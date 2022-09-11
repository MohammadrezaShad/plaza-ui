import {useEffect, useState} from 'react';

export const useTouch = (): boolean[] => {
  const [touchSupport, setTouchSupport] = useState(false);
  const isTouchEnabled = (): void => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setTouchSupport(true);
    } else {
      setTouchSupport(false);
    }
  };

  useEffect(() => {
    isTouchEnabled();
  }, []);

  return [touchSupport];
};
