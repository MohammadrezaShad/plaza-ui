export const disableBodyScroll = (scrollbarWidth: number) => {
  document.body.style.paddingRight = `${scrollbarWidth}px`;
  document.body.style.overflow = 'hidden';
};
