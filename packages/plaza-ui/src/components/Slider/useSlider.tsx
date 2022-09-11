/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEventCallback} from '@plaza-ui/hooks/lib//useEventCallback';
import {useForkRef} from '@plaza-ui/hooks/lib//useForkRef';
import {useIsFocusVisible} from '@plaza-ui/hooks/lib//useIsFocusVisible';
import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import {useIsomorphicLayoutEffect} from '@plaza-ui/hooks/lib/useIsomorphicLayoutEffect';
import {ownerDocument} from '@plaza-ui/utils/lib/ownerDocument';
import React from 'react';

import {Mark, SliderDirection} from './Slider';
import {
  asc,
  axisProps,
  clamp,
  doesSupportTouchActionNone,
  findClosest,
  focusThumb,
  INTENTIONAL_DRAG_COUNT_THRESHOLD,
  percentToValue,
  roundValueToStep,
  setValueIndex,
  trackFinger,
  valueToPercent,
} from './Slider.utils';

type UseSlider = {
  valueProp?: number | number[];
  defaultValue?: number | number[];
  min?: number;
  max?: number;
  onChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number,
  ) => void;
  onChangeCommitted?: (
    event: React.SyntheticEvent | Event,
    value: number | number[],
  ) => void;
  name?: string;
  marksProp?: boolean | Mark[];
  step?: number | null;
  ref?: React.ForwardedRef<any>;
  disabled?: boolean;
  disableSwap?: boolean;
  orientation?: 'horizontal' | 'vertical';
  isRtl?: boolean;
  onMouseDown?: (event: MouseEvent) => void;
};

export function useSlider({
  valueProp,
  defaultValue,
  min,
  max,
  name,
  marksProp,
  onChange,
  onChangeCommitted,
  step,
  ref,
  disabled,
  disableSwap,
  isRtl,
  orientation,
  onMouseDown,
}: UseSlider) {
  const touchId = React.useRef();
  const [active, setActive] = React.useState(-1);
  const [open, setOpen] = React.useState(-1);
  const [dragging, setDragging] = React.useState(false);
  const moveCount = React.useRef(0);

  const [valueDerived, setValueState] = useControlled({
    controlled: valueProp,
    default: defaultValue ?? min,
    name: 'Slider',
  });

  const handleChange =
    onChange &&
    ((
      event: React.ChangeEvent<HTMLInputElement>,
      value: number | number[],
      thumbIndex: number,
    ) => {
      const nativeEvent = (event.nativeEvent || event) as any;
      const clonedEvent = new nativeEvent.constructor(
        nativeEvent.type,
        nativeEvent,
      );

      Object.defineProperty(clonedEvent, 'target', {
        writable: true,
        value: {value, name},
      });

      onChange(clonedEvent, value, thumbIndex);
    });

  const range = Array.isArray(valueDerived);
  let values = range ? valueDerived.slice().sort(asc) : [valueDerived];
  values = values.map((value: number) =>
    clamp(value, min as number, max as number),
  );

  const marks =
    marksProp === true && step !== null
      ? [
          ...Array(
            Math.floor(((max as number) - (min as number)) / (step as number)) +
              1,
          ),
        ].map((_, index) => ({
          value: (min as number) + (step as number) * index,
        }))
      : marksProp || [];

  const {
    isFocusVisibleRef,
    onBlur: handleBlurVisible,
    onFocus: handleFocusVisible,
    ref: focusVisibleRef,
  } = useIsFocusVisible();

  const [focusVisible, setFocusVisible] = React.useState(-1);

  const sliderRef = React.useRef();
  const handleFocusRef = useForkRef(focusVisibleRef, sliderRef);
  const handleRef = useForkRef(ref, handleFocusRef);

  const handleFocus = useEventCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      const index = Number(
        (event.currentTarget as HTMLElement).getAttribute('data-index'),
      );
      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setFocusVisible(index);
      }
      setOpen(index);
    },
  );
  const handleBlur = useEventCallback(
    (event: React.FocusEvent<HTMLInputElement>) => {
      handleBlurVisible();
      if (isFocusVisibleRef.current === false) {
        setFocusVisible(-1);
      }
      setOpen(-1);
    },
  );
  const handleMouseOver = useEventCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      const index = Number(event.currentTarget.getAttribute('data-index'));
      setOpen(index);
    },
  );
  const handleMouseLeave = useEventCallback(() => {
    setOpen(-1);
  });

  useIsomorphicLayoutEffect(() => {
    if (
      disabled &&
      (sliderRef as React.MutableRefObject<any>).current.contains(
        document.activeElement,
      )
    ) {
      (document.activeElement as HTMLElement).blur();
    }
  }, [disabled]);

  if (disabled && active !== -1) {
    setActive(-1);
  }
  if (disabled && focusVisible !== -1) {
    setFocusVisible(-1);
  }

  const handleHiddenInputChange = useEventCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const index = Number(event.currentTarget.getAttribute('data-index'));
      const value = values[index];
      const marksValues = (marks as Mark[]).map(mark => mark.value);
      const marksIndex = marksValues.indexOf(value);

      let newValue: number | number[] = event.target.valueAsNumber;

      if (marks && step == null) {
        newValue =
          newValue < value
            ? marksValues[marksIndex - 1]
            : marksValues[marksIndex + 1];
      }

      newValue = clamp(newValue, min as number, max as number);

      if (marks && step == null) {
        const markValues = (marks as Mark[]).map(mark => mark.value);
        const currentMarkIndex = markValues.indexOf(values[index]);

        newValue =
          newValue < values[index]
            ? markValues[currentMarkIndex - 1]
            : markValues[currentMarkIndex + 1];
      }

      if (range) {
        // Bound the new value to the thumb's neighbours.
        if (disableSwap) {
          newValue = clamp(
            newValue,
            values[index - 1] || -Infinity,
            values[index + 1] || Infinity,
          );
        }

        const previousValue = newValue;
        newValue = setValueIndex({
          values,
          source: valueDerived,
          newValue,
          index,
        }).sort(asc);

        let activeIndex = index;

        // Potentially swap the index if needed.
        if (!disableSwap) {
          activeIndex = newValue.indexOf(previousValue);
        }

        focusThumb({sliderRef, activeIndex});
      }

      setValueState(newValue);
      setFocusVisible(index);

      if (handleChange) {
        handleChange(event, newValue, index);
      }

      if (onChangeCommitted) {
        onChangeCommitted(event, newValue);
      }
    },
  );

  const previousIndex = React.useRef<number | undefined>();
  let axis = orientation;
  if (isRtl && orientation === 'horizontal') {
    axis += '-reverse';
  }

  const getFingerNewValue = ({
    finger,
    move = false,
    values: values2,
    source,
  }: {
    finger: boolean | {x: number; y: number};
    move?: boolean;
    values: number[];
    source: number[];
  }) => {
    const {current: slider} = sliderRef as React.MutableRefObject<any>;
    const {width, height, bottom, left} = slider.getBoundingClientRect();
    let percent;

    if ((axis as SliderDirection).indexOf('vertical') === 0) {
      percent = (bottom - (finger as {x: number; y: number}).y) / height;
    } else {
      percent = ((finger as {x: number; y: number}).x - left) / width;
    }

    if ((axis as SliderDirection).indexOf('-reverse') !== -1) {
      percent = 1 - percent;
    }

    let newValue;
    newValue = percentToValue(percent, min as number, max as number);
    if (step) {
      newValue = roundValueToStep(newValue, step, min as number);
    } else {
      const marksValues = (marks as Mark[]).map(mark => mark.value);
      const closestIndex = findClosest(marksValues, newValue);
      newValue = marksValues[closestIndex];
    }

    newValue = clamp(newValue, min as number, max as number);
    let activeIndex = 0;

    if (range) {
      if (!move) {
        activeIndex = findClosest(values2, newValue);
      } else {
        activeIndex = previousIndex.current as number;
      }

      // Bound the new value to the thumb's neighbours.
      if (disableSwap) {
        newValue = clamp(
          newValue,
          values2[activeIndex - 1] || -Infinity,
          values2[activeIndex + 1] || Infinity,
        );
      }

      const previousValue = newValue;
      newValue = setValueIndex({
        values: values2,
        source,
        newValue,
        index: activeIndex,
      }).sort(asc);

      // Potentially swap the index if needed.
      if (!(disableSwap && move)) {
        activeIndex = newValue.indexOf(previousValue);
        previousIndex.current = activeIndex;
      }
    }

    return {newValue, activeIndex};
  };

  const handleTouchMove = useEventCallback((nativeEvent: any) => {
    const finger = trackFinger(nativeEvent, touchId);

    if (!finger) {
      return;
    }

    moveCount.current += 1;

    // Cancel move in case some other element consumed a mouseup event and it was not fired.
    if (nativeEvent.type === 'mousemove' && nativeEvent.buttons === 0) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      handleTouchEnd(nativeEvent);
      return;
    }

    const {newValue, activeIndex} = getFingerNewValue({
      finger,
      move: true,
      values,
      source: valueDerived,
    });

    focusThumb({sliderRef, activeIndex, setActive});
    (setValueState as any)(newValue);

    if (!dragging && moveCount.current > INTENTIONAL_DRAG_COUNT_THRESHOLD) {
      setDragging(true);
    }

    if (handleChange) {
      handleChange(nativeEvent, newValue, activeIndex);
    }
  });

  const handleTouchEnd = useEventCallback((nativeEvent: any) => {
    const finger = trackFinger(nativeEvent, touchId);
    setDragging(false);

    if (!finger) {
      return;
    }

    const {newValue} = getFingerNewValue({
      finger,
      values,
      source: valueDerived,
    });

    setActive(-1);
    if (nativeEvent.type === 'touchend') {
      setOpen(-1);
    }

    if (onChangeCommitted) {
      onChangeCommitted(nativeEvent, newValue);
    }

    touchId.current = undefined;

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopListening();
  });

  const handleTouchStart = useEventCallback((nativeEvent: any) => {
    if (disabled) return;
    // If touch-action: none; is not supported we need to prevent the scroll manually.
    if (!doesSupportTouchActionNone()) {
      nativeEvent.preventDefault();
    }

    const touch = nativeEvent.changedTouches[0];
    if (touch != null) {
      // A number that uniquely identifies the current finger in the touch session.
      touchId.current = touch.identifier;
    }
    const finger = trackFinger(nativeEvent, touchId);
    const {newValue, activeIndex} = getFingerNewValue({
      finger,
      values,
      source: valueDerived,
    });
    focusThumb({sliderRef, activeIndex, setActive});

    (setValueState as any)(newValue);

    if (handleChange) {
      handleChange(nativeEvent, newValue, activeIndex);
    }

    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener('touchmove', handleTouchMove);
    doc.addEventListener('touchend', handleTouchEnd);
  });

  const stopListening = React.useCallback(() => {
    const doc = ownerDocument(sliderRef.current);
    document.removeEventListener('mousemove', handleTouchMove);
    document.removeEventListener('mouseup', handleTouchEnd);
    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchEnd, handleTouchMove]);

  React.useEffect(() => {
    const {current: slider} = sliderRef as React.MutableRefObject<any>;
    slider.addEventListener('touchstart', handleTouchStart, {
      passive: doesSupportTouchActionNone(),
    });

    return () => {
      slider.removeEventListener('touchstart', handleTouchStart, {
        passive: doesSupportTouchActionNone(),
      });

      stopListening();
    };
  }, [stopListening, handleTouchStart]);

  React.useEffect(() => {
    if (disabled) {
      stopListening();
    }
  }, [disabled, stopListening]);

  const handleMouseDown = useEventCallback((event: any) => {
    if (onMouseDown) {
      onMouseDown(event);
    }

    // Only handle left clicks
    if (event.button !== 0) {
      return;
    }

    // Avoid text selection
    event.preventDefault();
    const finger = trackFinger(event, touchId);
    const {newValue, activeIndex} = getFingerNewValue({
      finger,
      values,
      source: valueDerived,
    });
    focusThumb({sliderRef, activeIndex, setActive});

    (setValueState as any)(newValue);

    if (handleChange) {
      handleChange(event, newValue, activeIndex);
    }

    moveCount.current = 0;
    const doc = ownerDocument(sliderRef.current);
    doc.addEventListener('mousemove', handleTouchMove);
    doc.addEventListener('mouseup', handleTouchEnd);
  });

  const trackOffset = valueToPercent(
    range ? values[0] : min,
    min as number,
    max as number,
  );
  const trackLeap =
    valueToPercent(values[values.length - 1], min as number, max as number) -
    trackOffset;
  const trackStyle = {
    ...axisProps[axis as SliderDirection].offset(trackOffset),
    ...axisProps[axis as SliderDirection].leap(trackLeap),
  };

  return {
    touchId,
    active,
    setActive,
    open,
    setOpen,
    dragging,
    setDragging,
    moveCount,
    valueDerived,
    setValueState,
    range,
    values,
    handleChange,
    marks,
    isFocusVisibleRef,
    handleBlurVisible,
    handleFocusVisible,
    focusVisibleRef,
    sliderRef,
    handleFocusRef,
    handleRef,
    focusVisible,
    setFocusVisible,
    handleFocus,
    handleBlur,
    handleMouseOver,
    handleMouseLeave,
    handleHiddenInputChange,
    previousIndex,
    axis,
    getFingerNewValue,
    handleTouchStart,
    stopListening,
    handleMouseDown,
    trackStyle,
  };
}
