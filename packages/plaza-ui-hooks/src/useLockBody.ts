import {scrollbarWidth} from '@plaza-ui/utils';
import {disableBodyScroll} from '@plaza-ui/utils/lib/disableBodyScroll';
/* Utils */
import {enableBodyScroll} from '@plaza-ui/utils/lib/enableBodyScroll';
import {useEffect} from 'react';

export const useLockBody = (isLocked: boolean) => {
  useEffect(() => {
    const sbw = scrollbarWidth();
    if (isLocked) {
      disableBodyScroll(sbw || 0);
    } else {
      enableBodyScroll();
    }
    return () => {
      if (isLocked) {
        enableBodyScroll();
      }
    };
  }, [isLocked]);
};
