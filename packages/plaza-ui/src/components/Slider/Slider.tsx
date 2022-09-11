/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import {visuallyHidden} from '@plaza-ui/utils/lib/visuallyHidden';
import clsx from 'clsx';
import React, {forwardRef} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import Tooltip from '../Tooltip';
import * as S from './Slider.styled';
import {axisProps, Forward, Identity, valueToPercent} from './Slider.utils';
import {getSliderUtilityClass, SliderClasses} from './sliderClasses';
import SliderLabelValue from './SliderLabelValue';
import {useSlider} from './useSlider';

export interface Mark {
  value: number;
  label?: React.ReactNode;
}
export type TrackTypes = 'normal' | false | 'inverted';

export type SliderDirection = 'horizontal' | 'vertical';

interface SliderProps {
  /**
   * The label of the slider.
   */
  'aria-label'?: string;
  /**
   * The id of the element containing a label for the slider.
   */
  'aria-labelledby'?: string;
  /**
   * A string value that provides a user-friendly name for the current value of the slider.
   */
  'aria-valuetext'?: string;
  /**
   * Override or extend the styles applied to the component.
   */
  /**
   * The components used for each slot inside the Slider.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  component?: React.ElementType;
  components?: {
    Root?: React.ElementType;
    Track?: React.ElementType;
    Rail?: React.ElementType;
    Thumb?: React.ElementType;
    Mark?: React.ElementType;
    MarkLabel?: React.ElementType;
    ValueLabel?: React.ElementType;
  };
  /**
   * The props used for each slot inside the Slider.
   * @default {}
   */

  /**
   * The default value. Use when the component is not controlled.
   */
  defaultValue?: number | number[];
  /**
   * If `true`, the component is disabled.
   * @default false
   */
  disabled?: boolean;
  /**
   * If `true`, the active thumb doesn't swap when moving pointer over a thumb while dragging another thumb.
   * @default false
   */
  disableSwap?: boolean;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the thumb labels of the slider.
   * This is important for screen reader users.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaLabel?: (index: number) => string;
  /**
   * Accepts a function which returns a string value that provides a user-friendly name for the current value of the slider.
   * This is important for screen reader users.
   * @param {number} value The thumb label's value to format.
   * @param {number} index The thumb label's index to format.
   * @returns {string}
   */
  getAriaValueText?: (value: number, index: number) => string;
  /**
   * Indicates whether the theme context has rtl direction. It is set automatically.
   * @default false
   */
  isRtl?: boolean;
  /**
   * Marks indicate predetermined values to which the user can move the slider.
   * If `true` the marks are spaced according the value of the `step` prop.
   * If an array, it should contain objects with `value` and an optional `label` keys.
   * @default false
   */
  marks?: boolean | Mark[];
  /**
   * The maximum allowed value of the slider.
   * Should not be equal to min.
   * @default 100
   */
  max?: number;
  /**
   * The minimum allowed value of the slider.
   * Should not be equal to max.
   * @default 0
   */
  min?: number;
  /**
   * Name attribute of the hidden `input` element.
   */
  name?: string;
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {Event} event The event source of the callback.
   * You can pull out the new value by accessing `event.target.value` (any).
   * **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   * @param {number} activeThumb Index of the currently moved thumb.
   */
  onChange?: (
    event: Event,
    value: number | number[],
    activeThumb: number,
  ) => void;
  /**
   * Callback function that is fired when the `mouseup` is triggered.
   *
   * @param {React.SyntheticEvent | Event} event The event source of the callback. **Warning**: This is a generic event not a change event.
   * @param {number | number[]} value The new value.
   */
  onChangeCommitted?: (
    event: React.SyntheticEvent | Event,
    value: number | number[],
  ) => void;
  /**
   * The component orientation.
   * @default 'horizontal'
   */
  orientation?: SliderDirection;
  /**
   * A transformation function, to change the scale of the slider.
   * @default (x) => x
   */
  scale?: (value: number) => number;
  /**
   * The granularity with which the slider can step through values. (A "discrete" slider.)
   * The `min` prop serves as the origin for the valid values.
   * We recommend (max - min) to be evenly divisible by the step.
   *
   * When step is `null`, the thumb can only be slid onto marks provided with the `marks` prop.
   * @default 1
   */
  step?: number | null;
  /**
   * Tab index attribute of the hidden `input` element.
   */
  tabIndex?: number;
  /**
   * The track presentation:
   *
   * - `normal` the track will render a bar representing the slider value.
   * - `inverted` the track will render a bar representing the remaining slider value.
   * - `false` the track will render without a bar.
   * @default 'normal'
   */
  track?: TrackTypes;
  /**
   * The value of the slider.
   * For ranged sliders, provide an array with two values.
   */
  value?: number | number[];
  /**
   * Controls when the value label is displayed:
   *
   * - `auto` the value label will display when the thumb is hovered or focused.
   * - `on` will display persistently.
   * - `off` will never display.
   * @default 'off'
   */
  valueLabelDisplay?: 'on' | 'auto' | 'off';
  /**
   * The format function the value label's value.
   *
   * When a function is provided, it should have the following signature:
   *
   * - {number} value The value label's value to format
   * - {number} index The value label's index to format
   * @default (x) => x
   */
  valueLabelFormat?:
    | string
    | ((value: number, index: number) => React.ReactNode);
  onMouseDown?: (event: MouseEvent) => void;
  hasDefaultTooltip?: boolean;
  sx?: SxType;
  classes?: Partial<SliderClasses>;
  className?: string;
}

const useUtilityClasses = (ownerState: any) => {
  const {disabled, marked, orientation, track, classes} = ownerState;

  const slots = {
    root: [
      'root',
      disabled && 'disabled',
      marked && 'marked',
      orientation === 'vertical' && 'vertical',
      track === 'inverted' && 'trackInverted',
      track === false && 'trackFalse',
    ],
    rail: ['rail'],
    track: ['track'],
    mark: ['mark'],
    markActive: ['markActive'],
    markLabel: ['markLabel'],
    markLabelActive: ['markLabelActive'],
    valueLabel: ['valueLabel'],
    thumb: ['thumb', disabled && 'disabled'],
    active: ['active'],
    disabled: ['disabled'],
    focusVisible: ['focusVisible'],
  };

  return composeClasses(slots, getSliderUtilityClass, classes);
};

const Slider = forwardRef<any, SliderProps>((props, ref) => {
  const {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledby,
    'aria-valuetext': ariaValuetext,
    className,
    component = 'span',
    defaultValue,
    disableSwap = false,
    disabled = false,
    hasDefaultTooltip = true,
    getAriaLabel,
    getAriaValueText,
    marks: marksProp = false,
    max = 100,
    min = 0,
    name,
    onChange,
    onChangeCommitted,
    onMouseDown,
    orientation = 'horizontal',
    scale = Identity,
    step = 1,
    tabIndex,
    track = 'normal',
    value: valueProp,
    valueLabelDisplay = 'off',
    valueLabelFormat = Identity,
    isRtl = false,
    components = {},
    sx,
    classes: classesProp,
    ...other
  } = props;

  const {
    active,
    open,
    range,
    values,
    marks,
    handleRef,
    handleBlur,
    handleFocus,
    handleMouseLeave,
    handleMouseOver,
    handleHiddenInputChange,
    axis,
    handleMouseDown,
    trackStyle,
  } = useSlider({
    defaultValue,
    min,
    valueProp,
    max,
    name,
    marksProp,
    step,
    onChange,
    ref,
    disabled,
    disableSwap,
    onChangeCommitted,
    isRtl,
    orientation,
    onMouseDown,
  });
  const sxStyles = useSxProp(sx);

  const Root = components.Root || S.Root;
  const rootProps = {
    ref: handleRef,
    onMouseDown: disabled ? undefined : handleMouseDown,
    $orientation: orientation,
    $disabled: disabled,
    sx: sxStyles,
  };

  const Rail = components.Rail || S.Rail;
  const railProps = {
    $orientation: orientation,
    $track: track,
  };

  const Track = components.Track || S.Track;
  const trackProps = {
    $orientation: orientation,
    $track: track,
  };

  const Thumb = components.Thumb || S.Thumb;
  const thumbProps = {
    onMouseOver: handleMouseOver,
    onMouseLeave: handleMouseLeave,
    $orientation: orientation,
    $isRtl: isRtl,
  };

  const Mark = components.Mark || S.Mark;
  const markProps = {};

  const MarkLabel = components.MarkLabel || S.MarkLabel;
  const markLabelProps = {
    $orientation: orientation,
    $isRtl: isRtl,
  };

  const DefaultLabelValue = hasDefaultTooltip ? Tooltip : SliderLabelValue;
  const ValueLabel = components.ValueLabel || DefaultLabelValue;

  const valueLabelProps = {
    valueLabelFormat,
    valueLabelDisplay,
    disabled,
  };

  const ownerState = {
    ...props,
    classes: classesProp,
    disabled,
    isRtl,
    max,
    min,
    orientation,
    scale,
    step,
    track,
    valueLabelDisplay,
    valueLabelFormat,
  };
  const classes = useUtilityClasses(ownerState);

  return (
    <Root {...rootProps} {...other} className={clsx(classes.root, className)}>
      <Rail {...railProps} className={clsx(classes.rail)} />
      <Track
        {...trackProps}
        style={{...trackStyle}}
        className={clsx(classes.track)}
      />
      {(marks as Mark[]).map((mark, index) => {
        const percent = valueToPercent(mark.value, min, max);
        const style = axisProps[axis as SliderDirection].offset(percent);

        let markActive;
        if (track === false) {
          markActive = values.indexOf(mark.value) !== -1;
        } else {
          markActive =
            (track === 'normal' &&
              (range
                ? mark.value >= values[0] &&
                  mark.value <= values[values.length - 1]
                : mark.value <= values[0])) ||
            (track === 'inverted' &&
              (range
                ? mark.value <= values[0] ||
                  mark.value >= values[values.length - 1]
                : mark.value >= values[0]));
        }

        return (
          <React.Fragment key={mark.value}>
            <Mark
              data-index={index}
              {...markProps}
              $markActive={markActive}
              className={clsx(classes.mark, {
                [classes.markActive]: markActive,
              })}
              style={{...style}}
            />
            {mark.label != null ? (
              <MarkLabel
                aria-hidden
                data-index={index}
                {...markLabelProps}
                $markLabelActive={markActive}
                style={{...style}}
                className={clsx(classes.markLabel, {
                  [classes.markLabelActive]: markActive,
                })}
              >
                {mark.label}
              </MarkLabel>
            ) : null}
          </React.Fragment>
        );
      })}
      {values.map((value: any, index: number) => {
        const percent = valueToPercent(value, min, max);
        const style = axisProps[axis as SliderDirection].offset(percent);

        const ValueLabelComponent =
          valueLabelDisplay === 'off' ? Forward : ValueLabel;

        return (
          <React.Fragment key={index}>
            <ValueLabelComponent
              value={
                typeof valueLabelFormat === 'function'
                  ? valueLabelFormat(scale(value), index)
                  : valueLabelFormat
              }
              title={
                typeof valueLabelFormat === 'function'
                  ? valueLabelFormat(scale(value), index)
                  : valueLabelFormat
              }
              index={index}
              open={
                open === index || active === index || valueLabelDisplay === 'on'
              }
              className={clsx(classes.valueLabel)}
              {...valueLabelProps}
            >
              <Thumb
                data-index={index}
                {...thumbProps}
                style={{
                  ...style,
                  pointerEvents:
                    disableSwap && active !== index ? 'none' : undefined,
                }}
                className={clsx(classes.thumb, {
                  [classes.active]: active === index,
                })}
              >
                <S.InnerThumb />
                <input
                  tabIndex={tabIndex}
                  data-index={index}
                  aria-label={getAriaLabel ? getAriaLabel(index) : ariaLabel}
                  aria-labelledby={ariaLabelledby}
                  aria-orientation={orientation}
                  aria-valuemax={scale(max)}
                  aria-valuemin={scale(min)}
                  aria-valuenow={scale(value)}
                  aria-valuetext={
                    getAriaValueText
                      ? getAriaValueText(scale(value), index)
                      : ariaValuetext
                  }
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  name={name}
                  type="range"
                  min={props.min}
                  max={props.max}
                  step={props.step as any}
                  disabled={disabled}
                  value={values[index]}
                  onChange={handleHiddenInputChange}
                  style={{
                    ...visuallyHidden,
                    direction: isRtl ? 'rtl' : 'ltr',
                    // So that VoiceOver's focus indicator matches the thumb's dimensions
                    width: '100%',
                    height: '100%',
                  }}
                />
              </Thumb>
            </ValueLabelComponent>
          </React.Fragment>
        );
      })}
    </Root>
  );
});

Slider.displayName = 'Slider';

export default Slider;
