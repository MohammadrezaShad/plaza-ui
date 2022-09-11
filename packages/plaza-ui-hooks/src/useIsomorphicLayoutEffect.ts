import {isBrowser} from '@plaza-ui/utils/lib/main';
import {useEffect, useLayoutEffect} from 'react';

export const useIsomorphicLayoutEffect = isBrowser
  ? useLayoutEffect
  : useEffect;

export default useIsomorphicLayoutEffect;
