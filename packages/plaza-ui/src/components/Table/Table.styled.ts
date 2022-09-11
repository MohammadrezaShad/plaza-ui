import styled, {CSSObject} from 'styled-components';

export const Table = styled.table<{sx?: CSSObject}>`
  width: 100%;
  display: table;
  border-spacing: 0;
  border-collapse: collapse;
  ${({sx}) => sx};
`;
