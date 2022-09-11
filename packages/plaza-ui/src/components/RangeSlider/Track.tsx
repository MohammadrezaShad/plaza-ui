import React, {forwardRef, ReactNode} from 'react';

import * as S from './RangeSlider.styled';

type TrackProps = {
  children?: ReactNode;
  width: number;
  left: number;
};

const Track = forwardRef<HTMLDivElement, TrackProps>(
  ({children, width, left}, ref) => (
    <S.Track ref={ref} width={width} left={left}>
      {children}
    </S.Track>
  ),
);

export default Track;

Track.displayName = 'Track';
