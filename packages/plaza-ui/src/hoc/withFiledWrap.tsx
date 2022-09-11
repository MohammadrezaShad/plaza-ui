import React, {FC} from 'react';
import styled from 'styled-components';

import {WithFieldWrapProps} from '../shared/Field.types';

const Wrapper = styled.div``;

const S = {Wrapper};

const WithFieldWrap: FC<WithFieldWrapProps> = ({
  subChildren,
  children,
  label,
  helperText,
}) => (
  <>
    {subChildren || label || helperText ? (
      <S.Wrapper>{children}</S.Wrapper>
    ) : (
      children
    )}
  </>
);

export default WithFieldWrap;
