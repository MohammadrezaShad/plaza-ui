import React, {FC, ReactNode} from 'react';
import styled from 'styled-components';

import {Direction} from '../shared/Toggle.types';

const Wrapper = styled.label<{
  $direction?: Direction;
  $disabled?: boolean;
}>`
  display: inline-flex;
  align-items: center;
  direction: ${({$direction}) => $direction};
  cursor: ${({$disabled}) => ($disabled ? null : 'pointer')};
`;

const S = {Wrapper};

export type WithToggleWrapProps = {
  children: ReactNode;
  subChildren?: ReactNode;
  text?: string | number | symbol;
  direction?: Direction;
  disabled?: boolean;
};

const WithToggleWrap: FC<WithToggleWrapProps> = ({
  subChildren,
  children,
  text,
  direction,
  disabled,
}) => (
  <>
    {subChildren || text ? (
      <S.Wrapper $direction={direction} $disabled={disabled}>
        {children}
      </S.Wrapper>
    ) : (
      children
    )}
  </>
);

export default WithToggleWrap;
