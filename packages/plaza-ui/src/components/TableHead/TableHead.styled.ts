import styled, {CSSObject} from 'styled-components';

export const THead = styled.thead<{sx?: CSSObject}>`
  display: table-header-group;
  ${({sx}) => sx};
`;
