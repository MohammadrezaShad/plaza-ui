import React, {forwardRef, ReactNode} from 'react';

import * as S from './RangeSlider.styled';

type ThumbProps = {
  children?: ReactNode;
  onMouseDown: (event: React.MouseEvent) => void;
  left: number;
};

const Thumb = forwardRef<HTMLSpanElement, ThumbProps>(
  ({children, onMouseDown, left}, ref) => (
    <S.Thumb left={left} onMouseDown={onMouseDown} ref={ref}>
      {children}
    </S.Thumb>
  ),
);

export default Thumb;

Thumb.displayName = 'Thumb';
