import styled, {CSSObject} from 'styled-components';

export const Box = styled.div<{sx?: CSSObject}>`
  ${({sx}) => sx};
`;
