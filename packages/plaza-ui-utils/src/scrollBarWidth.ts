/* eslint-disable no-underscore-dangle */

export const scrollbarWidth = (): number => {
  // safety check for SSR
  if (typeof document === 'undefined') {
    return 0;
  }

  const getScrollbarWidth = () =>
    window.innerWidth - document.documentElement.clientWidth;

  const sbw = getScrollbarWidth();

  return sbw;
};
