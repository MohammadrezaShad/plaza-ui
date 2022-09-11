import styled, {CSSObject} from 'styled-components';

export const Pagination = styled.div<{sx?: CSSObject}>`
  ${({sx}) => sx};
`;

export const PaginationList = styled.ul`
  display: flex;
`;

export const PaginationItem = styled.li`
  &:not(:last-child) {
    margin-left: ${({theme}) => theme.spacing(4)};
  }
`;
