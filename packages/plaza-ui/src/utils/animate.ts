/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
type Options = {
  ease?: (time: number) => number;
  duration?: number;
};

type Cb = (fn?: any) => void;

function easeInOutSin(time: number) {
  return (1 + Math.sin(Math.PI * time - Math.PI / 2)) / 2;
}

export default function animate(
  property: string,
  element: HTMLElement,
  to: number,
  options: Options = {},
  cb: Cb = () => {},
) {
  const {
    ease = easeInOutSin,
    duration = 300, // standard
  } = options;

  let start: number | null = null;
  const from = (element as any)[property];
  let cancelled = false;

  const cancel = () => {
    cancelled = true;
  };

  const step = (timestamp: number) => {
    if (cancelled) {
      cb(new Error('[Plaza-UI] : Animation cancelled'));
      return;
    }

    if (start === null) {
      start = timestamp;
    }
    const time = Math.min(1, (timestamp - start) / duration);

    // eslint-disable-next-line no-param-reassign
    (element as any)[property] = ease(time) * (to - from) + from;

    if (time >= 1) {
      requestAnimationFrame(() => {
        cb(null);
      });
      return;
    }

    requestAnimationFrame(step);
  };

  if (from === to) {
    cb(new Error('Element already at target position'));
    return cancel;
  }

  requestAnimationFrame(step);
  return cancel;
}
