/* Hooks */
import {useMeasure} from '@plaza-ui/hooks/lib/useMeasure';
import React, {useRef, useState} from 'react';

type Value = [number, number] | number;

type UseRangeSlider = {
  onChange?: (
    event: React.TouchEvent | globalThis.MouseEvent,
    newValue: Value,
  ) => void;
  value: Value;
};

export const useRangeSlider = ({onChange, value}: UseRangeSlider) => {
  const [thumbsPosition, setThumbPosition] = useState<Value>(getValue(value));
  const thumbPositionRef = useRef<Value>(getValue(value));

  const [firstThumbRef, firstThumbDimensions] = useMeasure();
  const [secondThumbRef, secondThumbDimensions] = useMeasure();
  const [railRef, railDimensions] = useMeasure();
  const thumStartRef = useRef(0);

  function getValue(inputValue: Value): Value {
    return Array.isArray(inputValue) ? [...inputValue] : inputValue;
  }

  const handleSecondThumbMouseDown = (event: React.MouseEvent) => {
    thumStartRef.current = getStartPosition({
      clinentPos: event.clientX,
      thumbOffset: secondThumbDimensions.left,
      thumbWidth: secondThumbDimensions.width,
    });
    document.addEventListener('mousemove', handleSecondThumbMouseMove);
    document.addEventListener('mouseup', handleSecondThumbMouseUp);
  };

  const handleSecondThumbMouseMove = (event: globalThis.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    setSecondThumbPosition(event.clientX, event);
  };

  const setSecondThumbPosition = (
    clientPos: number,
    event: globalThis.MouseEvent,
  ) => {
    const currentThumbPosition = Array.isArray(thumbsPosition)
      ? getPositionOfThumb(clientPos, thumbsPosition[1])
      : getPositionOfThumb(clientPos, thumbsPosition);

    const secondThumbLimit = railDimensions.width;
    const firstThumbPosition = Array.isArray(thumbsPosition)
      ? getPxThumbPosition(thumbsPosition[0])
      : getPxThumbPosition(thumbsPosition);

    const validThumbPosition = getSecondThumbValidPosition({
      secondThumbLimit,
      firstThumbPosition,
      currentThumbPosition,
    });

    const currentDecimalPosition = getDecimalThumbPosition(
      validThumbPosition,
      railDimensions.width,
    );

    if (Array.isArray(thumbsPosition)) {
      setThumbPosition([thumbsPosition[0], currentDecimalPosition]);
      thumbPositionRef.current = [thumbsPosition[0], currentDecimalPosition];
    }
    onChange && onChange(event, thumbPositionRef.current);
  };

  const getSecondThumbValidPosition = ({
    secondThumbLimit,
    currentThumbPosition,
    firstThumbPosition,
  }: Record<string, number>) => {
    if (secondThumbLimit <= currentThumbPosition) {
      return secondThumbLimit;
    }
    if (currentThumbPosition <= firstThumbPosition) return firstThumbPosition;
    return currentThumbPosition;
  };

  const handleSecondThumbMouseUp = () => {
    document.removeEventListener('mouseup', handleSecondThumbMouseUp);
    document.removeEventListener('mousemove', handleSecondThumbMouseMove);
  };

  const handleFirstThumbMouseDown = (event: React.MouseEvent) => {
    thumStartRef.current = getStartPosition({
      clinentPos: event.clientX,
      thumbOffset: firstThumbDimensions.left,
      thumbWidth: firstThumbDimensions.width,
    });
    document.addEventListener('mousemove', handleFirstThumbMouseMove);
    document.addEventListener('mouseup', handleFirstThumbMouseUp);
  };

  const handleFirstThumbMouseMove = (event: globalThis.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    setFirstThumbPosition(event.clientX, event);
  };

  const setFirstThumbPosition = (
    clientPos: number,
    event: globalThis.MouseEvent,
  ) => {
    const currentThumbPosition = Array.isArray(thumbsPosition)
      ? getPositionOfThumb(clientPos, thumbsPosition[0])
      : getPositionOfThumb(clientPos, thumbsPosition);

    const firstThumbLimit = 0;
    const secondThumbPosition = Array.isArray(thumbsPosition)
      ? getPxThumbPosition(thumbsPosition[1])
      : getPxThumbPosition(thumbsPosition);

    const validThumbPosition = getFirstThumbValidPosition({
      firstThumbLimit,
      secondThumbPosition,
      currentThumbPosition,
    });

    const currentDecimalPosition = getDecimalThumbPosition(
      validThumbPosition,
      railDimensions.width,
    );
    if (Array.isArray(thumbsPosition)) {
      setThumbPosition([currentDecimalPosition, thumbsPosition[1]]);
      thumbPositionRef.current = [currentDecimalPosition, thumbsPosition[1]];
    }
    onChange && onChange(event, thumbPositionRef.current);
  };

  const getStartPosition = ({
    clinentPos,
    thumbOffset,
    thumbWidth,
  }: Record<string, number>): number =>
    clinentPos - thumbOffset - thumbWidth / 2;

  const getPositionOfThumb = (
    clientPos: number,
    thumbPosition: number,
  ): number =>
    getPxThumbPosition(thumbPosition) +
    clientPos -
    thumStartRef.current -
    railDimensions.left;

  const getPxThumbPosition = (thumbPosition: number): number =>
    (thumbPosition * railDimensions.width) / 100;

  const getFirstThumbValidPosition = ({
    firstThumbLimit,
    secondThumbPosition,
    currentThumbPosition,
  }: Record<string, number>) => {
    if (firstThumbLimit >= currentThumbPosition) {
      return firstThumbLimit;
    }
    if (currentThumbPosition >= secondThumbPosition) return secondThumbPosition;
    return currentThumbPosition;
  };

  const getDecimalThumbPosition = (
    validThumbPosition: number,
    railSize: number,
  ) => (validThumbPosition * 100) / railSize;

  const handleFirstThumbMouseUp = () => {
    document.removeEventListener('mouseup', handleFirstThumbMouseUp);
    document.removeEventListener('mousemove', handleFirstThumbMouseMove);
  };

  return {
    thumbsPosition,
    secondThumbRef,
    firstThumbRef,
    railRef,
    thumbPositionRef,
    handleSecondThumbMouseDown,
    handleFirstThumbMouseDown,
  };
};
