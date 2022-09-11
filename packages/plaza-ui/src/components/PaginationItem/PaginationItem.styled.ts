import styled, {CSSObject} from 'styled-components';

export const PaginationItem = styled.button<{sx?: CSSObject}>`
  padding-right: ${({theme}) => theme.spacing(3)};
  padding-left: ${({theme}) => theme.spacing(3)};
  min-width: 40px;
  ${({sx}) => sx};
`;
