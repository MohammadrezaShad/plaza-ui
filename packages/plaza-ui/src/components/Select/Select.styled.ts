import styled, {CSSObject} from 'styled-components';

export const Select = styled.div<{sx?: CSSObject}>`
  ${({sx}) => sx};
`;
