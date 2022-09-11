import styled, {CSSObject} from 'styled-components';

export const Wrapper = styled.div<{sx?: CSSObject}>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
`;

export const Icon = styled.svg`
  margin-right: auto;
  cursor: pointer;
`;
