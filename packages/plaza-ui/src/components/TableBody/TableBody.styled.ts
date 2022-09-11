import styled, {CSSObject} from 'styled-components';

export const TableBody = styled.tbody<{sx?: CSSObject}>`
  display: table-row-group;
  ${({sx}) => sx};
`;
