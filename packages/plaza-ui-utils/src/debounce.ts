/* eslint-disable @typescript-eslint/ban-types */
export function debounce(func: Function, wait = 166) {
  let timeout: ReturnType<typeof setTimeout>;
  function debounced(...args: unknown[]) {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  }

  debounced.clear = () => {
    clearTimeout(timeout);
  };

  return debounced;
}
