/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-types */
import {DependencyList, useEffect} from 'react';

import {useTimeoutFn} from './useTimeOutFn';

export type UseDebounceReturn = [() => boolean | null, () => void];

export function useDebounce(
  fn: Function,
  ms = 0,
  deps: DependencyList = [],
): UseDebounceReturn {
  const [isReady, cancel, reset] = useTimeoutFn(fn, ms);

  useEffect(reset, deps);

  return [isReady, cancel];
}
