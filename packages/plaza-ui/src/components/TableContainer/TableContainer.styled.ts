import styled, {CSSObject} from 'styled-components';

export const TableContainer = styled.div<{sx?: CSSObject}>`
  width: 100%;
  overflow-x: auto;
  ${({sx}) => sx};
`;
