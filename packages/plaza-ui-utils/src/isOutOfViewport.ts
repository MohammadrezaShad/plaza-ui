interface Out {
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
  any?: boolean;
  all?: boolean;
}

export function isOutOfViewport<T extends HTMLElement>(element: T) {
  // Get element's bounding
  const bounding = element?.getBoundingClientRect();

  // Check if it's out of the viewport on each side
  const out: Out = {};
  out.top = bounding ? bounding.top < 0 : false;
  out.left = bounding ? bounding.left < 0 : false;
  out.bottom = bounding
    ? bounding.bottom >
      (window.innerHeight || document.documentElement.clientHeight)
    : false;
  out.right = bounding
    ? bounding.right >
      (window.innerWidth || document.documentElement.clientWidth)
    : false;
  out.any = out.top || out.left || out.bottom || out.right;
  out.all = out.top && out.left && out.bottom && out.right;

  return out;
}
