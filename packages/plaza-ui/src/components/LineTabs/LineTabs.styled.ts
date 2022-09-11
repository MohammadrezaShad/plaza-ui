import styled, {CSSObject} from 'styled-components';

export const Wrap = styled.div<{sx?: CSSObject}>`
  direction: rtl;
  min-width: 100px;
  position: relative;
  ${({sx}) => sx};
`;

export const TabsList = styled.div`
  display: flex;
  width: calc(100% + ${({theme}) => theme.spacing(3)});
  margin: 0 ${({theme}) => `-${theme.spacing(2)}`};
`;
