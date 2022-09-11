/* eslint-disable @typescript-eslint/no-explicit-any */
import {ownerDocument} from '@plaza-ui/utils/lib/ownerDocument';
import React, {FC} from 'react';

export const INTENTIONAL_DRAG_COUNT_THRESHOLD = 2;

export function asc(a: number, b: number) {
  return a - b;
}

export function clamp(value: null | number, min: number, max: number) {
  if (value == null) {
    return min;
  }
  return Math.min(Math.max(min, value), max);
}
export function findClosest(values: number[], currentValue: number) {
  const {index: closestIndex} = values.reduce(
    (acc: any, value: number, index: number) => {
      const distance = Math.abs(currentValue - value);

      if (
        acc === null ||
        distance < acc.distance ||
        distance === acc.distance
      ) {
        return {
          distance,
          index,
        };
      }

      return acc;
    },
    null,
  ) as unknown as {distance: number; index: number};
  return closestIndex;
}

export function trackFinger(
  event: React.TouchEvent<Element> | MouseEvent,
  touchId: React.MutableRefObject<number | undefined>,
) {
  if (
    touchId.current !== undefined &&
    (event as React.TouchEvent<Element>).changedTouches
  ) {
    for (
      let i = 0;
      i < (event as React.TouchEvent<Element>).changedTouches.length;
      i += 1
    ) {
      const touch = (event as React.TouchEvent<Element>).changedTouches[i];
      if (touch.identifier === touchId.current) {
        return {
          x: touch.clientX,
          y: touch.clientY,
        };
      }
    }

    return false;
  }

  return {
    x: (event as MouseEvent).clientX,
    y: (event as MouseEvent).clientY,
  };
}

export function valueToPercent(value: number, min: number, max: number) {
  return ((value - min) * 100) / (max - min);
}

export function percentToValue(percent: number, min: number, max: number) {
  return (max - min) * percent + min;
}

export function getDecimalPrecision(num: number) {
  // This handles the case when num is very small (0.00000001), js will turn this into 1e-8.
  // When num is bigger than 1 or less than -1 it won't get converted to this notation so it's fine.
  if (Math.abs(num) < 1) {
    const parts = num.toExponential().split('e-');
    const matissaDecimalPart = parts[0].split('.')[1];
    return (
      (matissaDecimalPart ? matissaDecimalPart.length : 0) +
      parseInt(parts[1], 10)
    );
  }

  const decimalPart = num.toString().split('.')[1];
  return decimalPart ? decimalPart.length : 0;
}

export function roundValueToStep(value: number, step: number, min: number) {
  const nearest = Math.round((value - min) / step) * step + min;
  return Number(nearest.toFixed(getDecimalPrecision(step)));
}

export function setValueIndex({
  values,
  source,
  newValue,
  index,
}: {
  values: number[];
  source: number[];
  newValue: number;
  index: number;
}) {
  // Performance shortcut
  if (source[index] === newValue) {
    return source;
  }

  const output = values.slice();
  output[index] = newValue;
  return output;
}

export function focusThumb({
  sliderRef,
  activeIndex,
  setActive,
}: {
  sliderRef: React.MutableRefObject<any>;
  activeIndex: number;
  setActive?: React.Dispatch<React.SetStateAction<number>>;
}) {
  const doc = ownerDocument(sliderRef.current);
  if (
    !sliderRef.current.contains(doc.activeElement) ||
    Number((doc.activeElement as Element).getAttribute('data-index')) !==
      activeIndex
  ) {
    sliderRef.current
      .querySelector(`[type="range"][data-index="${activeIndex}"]`)
      .focus();
  }

  if (setActive) {
    setActive(activeIndex);
  }
}

export const axisProps = {
  horizontal: {
    offset: (percent: number) => ({left: `${percent}%`}),
    leap: (percent: number) => ({width: `${percent}%`}),
  },
  'horizontal-reverse': {
    offset: (percent: number) => ({right: `${percent}%`}),
    leap: (percent: number) => ({width: `${percent}%`}),
  },
  vertical: {
    offset: (percent: number) => ({bottom: `${percent}%`}),
    leap: (percent: number) => ({height: `${percent}%`}),
  },
};

export const Identity = (x: number) => x;

let cachedSupportsTouchActionNone: boolean;
export function doesSupportTouchActionNone() {
  if (cachedSupportsTouchActionNone === undefined) {
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
      cachedSupportsTouchActionNone = CSS.supports('touch-action', 'none');
    } else {
      cachedSupportsTouchActionNone = true;
    }
  }
  return cachedSupportsTouchActionNone;
}

export const Forward: FC = ({children}) => children as JSX.Element;
