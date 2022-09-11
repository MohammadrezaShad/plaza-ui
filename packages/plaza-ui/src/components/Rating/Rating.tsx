import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {
  forwardRef,
  MouseEvent,
  MutableRefObject,
  ReactNode,
  Ref,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import * as S from './Rating.styled';
import {getRatingUtilityClass, RatingClasses} from './ratingClasses';

export type RatingProps = {
  children?: ReactNode;
  rate?: number;
  onChange?: (rate: number) => void;
  readOnly?: boolean;
  disabled?: boolean;
  precision?: number;
  initialRate?: number;
  length?: number;
  hasHover?: boolean;
  sx?: SxType;
  className?: string;
  classes?: Partial<RatingClasses>;
};

const useUtilityClasses = (
  ownerState: Pick<RatingProps, 'classes' | 'disabled' | 'readOnly'>,
) => {
  const {classes, readOnly, disabled} = ownerState;

  const slots = {
    root: ['root', disabled && 'disabled', readOnly && 'readyOnly'],
    label: ['label'],
    icon: ['icon'],
    iconEmpty: ['iconEmpty'],
    iconFilled: ['iconFilled'],
  };

  return composeClasses(slots, getRatingUtilityClass, classes);
};

const Rating = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      rate: inputRate,
      onChange,
      readOnly,
      disabled,
      length = 5,
      precision = 0.5,
      initialRate = 0,
      hasHover = true,
      sx,
      className,
      classes: inputClasses,
    }: RatingProps,
    ref: Ref<T>,
  ) => {
    const rootRef = useRef() as MutableRefObject<T>;
    useImperativeHandle(ref, () => rootRef.current);
    const [rate, setRate] = useControlled<number | undefined>({
      controlled: inputRate,
      default: initialRate,
      name: 'Rating',
      state: 'rate',
    });
    const currentRate = inputRate ?? rate;
    const [liveRate, setLiveRate] = useState<null | number>(null);

    const sxStyles = useSxProp(sx);

    const onClick = (event: MouseEvent<HTMLDivElement>) => {
      if (disabled || readOnly) return;
      const calculatedRate =
        ((event.clientX - event.currentTarget.getClientRects()[0].left) /
          event.currentTarget.offsetWidth) *
        length;

      const roundedValue = roundValueToPrecision(calculatedRate, precision);

      if (inputRate === undefined) {
        setRate(roundedValue);
        setLiveRate(roundedValue);
      }
      onChange?.(roundedValue);
    };

    // eslint-disable-next-line @typescript-eslint/no-shadow
    function roundValueToPrecision(value: number, precision: number) {
      if (value == null) {
        return value;
      }

      const nearest = Math.round(value / precision) * precision;
      return Number(nearest.toFixed(getDecimalPrecision(precision)));
    }

    function getDecimalPrecision(num: number) {
      const decimalPart = num.toString().split('.')[1];
      return decimalPart ? decimalPart.length : 0;
    }

    const onMouseOver = () => {
      if (disabled || readOnly || !hasHover) return;
      setLiveRate(currentRate);
    };

    const onMouseLeave = () => {
      if (disabled || readOnly || !hasHover) return;
      setLiveRate(null);
    };

    const onMouseMove = (event: React.MouseEvent) => {
      if (disabled || readOnly || !hasHover) return;
      const rootNode = rootRef.current;
      const {left} = rootNode.getBoundingClientRect();

      const calculatedRate =
        ((event.clientX - left) /
          (event.currentTarget as HTMLElement).offsetWidth) *
        length;
      const hoverRate = roundValueToPrecision(calculatedRate, precision);
      setLiveRate(hoverRate);
    };

    const ownerState = {
      disabled,
      readOnly,
      classes: inputClasses,
    };
    const classes = useUtilityClasses(ownerState);

    return (
      <S.Stars
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onMouseMove={onMouseMove}
        ref={rootRef as unknown as RefObject<HTMLDivElement>}
        sx={sxStyles}
        className={clsx(classes.root, className)}
      >
        {Array.from({length}, (_, i) => i + 1).map(id => (
          <S.Wrap key={id}>
            <S.Icon
              className={clsx(classes.icon, classes.iconEmpty)}
              focusable="false"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </S.Icon>
          </S.Wrap>
        ))}
        <S.Wrapper onClick={onClick} />
        <S.Container rate={liveRate ?? currentRate}>
          {Array.from({length}, (_, i) => i + 1).map(id => (
            <S.Wrap key={id}>
              <S.FillIcon
                className={clsx(classes.icon, classes.iconFilled)}
                focusable="false"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </S.FillIcon>
            </S.Wrap>
          ))}
        </S.Container>
      </S.Stars>
    );
  },
);

Rating.displayName = 'Rating';

export default Rating;
