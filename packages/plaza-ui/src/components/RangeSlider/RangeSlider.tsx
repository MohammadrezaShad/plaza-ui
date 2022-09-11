import React, {FC, ReactNode, Ref, useState} from 'react';

import {useRangeSlider} from '../../hooks/useRangeSlider';
import useSxProp, {SxType} from '../../hooks/useSxProp';
import Rail from './Rail';
import * as S from './RangeSlider.styled';
import Thumb from './Thumb';
import Track from './Track';

type RangeSliderProps = {
  children?: ReactNode;
  sx?: SxType;
};

type Value = [number, number];

const RangeSlider: FC<RangeSliderProps> = ({sx}) => {
  const [value, setValue] = useState<Value>([0, 100]);
  const {
    firstThumbRef,
    secondThumbRef,
    thumbsPosition,
    railRef,
    handleSecondThumbMouseDown,
    handleFirstThumbMouseDown,
  } = useRangeSlider({value, onChange: handleChange});
  const [firstThumbLeft, secondThumbLeft] = thumbsPosition as Value;

  function handleChange(
    event: React.TouchEvent | globalThis.MouseEvent,
    newValue: number | number[],
  ) {
    setValue(newValue as Value);
  }

  const sxStyles = useSxProp(sx);
  return (
    <S.Wrap sx={sxStyles}>
      <Thumb
        ref={firstThumbRef}
        onMouseDown={handleFirstThumbMouseDown}
        left={firstThumbLeft}
      />
      <Rail ref={railRef as Ref<HTMLDivElement>} />
      <Track left={firstThumbLeft} width={secondThumbLeft - firstThumbLeft} />
      <Thumb
        left={secondThumbLeft}
        ref={secondThumbRef}
        onMouseDown={handleSecondThumbMouseDown}
      />
    </S.Wrap>
  );
};

export default RangeSlider;
