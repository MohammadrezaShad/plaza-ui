import React, {forwardRef, ReactNode} from 'react';

import * as S from './RangeSlider.styled';

type RailProps = {
  children?: ReactNode;
};

const Rail = forwardRef<HTMLDivElement, RailProps>(({children}, ref) => (
  <S.Rail ref={ref}>{children}</S.Rail>
));

export default Rail;

Rail.displayName = 'Rail';
