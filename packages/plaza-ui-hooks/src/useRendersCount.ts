import {useRef} from 'react';

export function useRendersCount(): number {
  // eslint-disable-next-line no-plusplus
  return ++useRef(0).current;
}
