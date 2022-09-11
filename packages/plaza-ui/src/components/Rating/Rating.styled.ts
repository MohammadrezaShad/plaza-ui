import styled, {CSSObject} from 'styled-components';

export const Stars = styled.div<{sx?: CSSObject}>`
  display: flex;
  direction: ltr;
  position: relative;
  ${({sx}) => sx};
`;

export const Wrapper = styled.div`
  position: absolute;
  overflow: hidden;
  top: 0;
  width: 100%;
  bottom: 0;
  z-index: 10;
  background-color: transparent;
`;

export const Container = styled.div<{rate: number}>`
  position: absolute;
  overflow: hidden;
  top: 0;
  width: ${({rate}) => `${(rate / 5) * 100}%`};
  display: flex;
`;

export const Wrap = styled.div``;

export const Icon = styled.svg`
  width: 20px;
`;

export const FillIcon = styled.svg`
  width: 20px;
  PATH {
    fill: ${({theme}) => theme.colors.primary.origin};
  }
`;
