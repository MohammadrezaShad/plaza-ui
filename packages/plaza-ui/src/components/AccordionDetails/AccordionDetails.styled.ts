import styled, {CSSObject} from 'styled-components';

export const AccordionDetails = styled.div<{sx?: CSSObject}>`
  padding: ${({theme}) =>
    `${theme.spacing(3)} ${theme.spacing(4)} ${theme.spacing(4)}`};
  ${({sx}) => sx};
`;
