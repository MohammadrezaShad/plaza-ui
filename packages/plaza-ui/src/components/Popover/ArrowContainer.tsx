import React, {FC, useMemo} from 'react';

import * as S from './Popover.styled';
import {ArrowContainerProps} from './Popover.types';
import {useArrowContainer} from './useArrowContainer';

export const ArrowContainer: FC<ArrowContainerProps> = ({
  childRect,
  popoverRect,
  position,
  arrowColor,
  arrowSize,
  arrowClassName,
  arrowStyle: externalArrowStyle,
  className,
  children,
  style: externalArrowContainerStyle,
  containerComponent,
  arrowComponent,
}) => {
  const {arrowContainerStyle, arrowStyle} = useArrowContainer({
    childRect,
    popoverRect,
    position,
    arrowColor,
    arrowSize,
  });

  const mergedContainerStyle = useMemo(
    () => ({
      ...arrowContainerStyle,
      ...externalArrowContainerStyle,
    }),
    [arrowContainerStyle, externalArrowContainerStyle],
  );

  const mergedArrowStyle = useMemo(
    () => ({
      ...arrowStyle,
      ...externalArrowStyle,
    }),
    [arrowStyle, externalArrowStyle],
  );

  return (
    <S.ArrowContainer
      as={containerComponent}
      className={className}
      style={mergedContainerStyle}
    >
      <S.Arrow
        as={arrowComponent}
        style={mergedArrowStyle}
        className={arrowClassName}
      />
      {children}
    </S.ArrowContainer>
  );
};
