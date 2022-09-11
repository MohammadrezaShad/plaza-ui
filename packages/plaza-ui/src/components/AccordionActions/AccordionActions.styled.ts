import styled, {css, CSSObject} from 'styled-components';

export const AccordionActions = styled.div<{
  $disableSpacing?: boolean;
  sx?: CSSObject;
}>`
  display: flex;
  align-items: center;
  padding: ${({theme}) => theme.spacing(3)};
  justify-content: flex-end;
  ${({theme, $disableSpacing}) =>
    !$disableSpacing
      ? css`
     & > :not(:first-of-type) {
         margin-left: ${theme.spacing(3)};
       },
  `
      : null};
  ${({sx}) => sx};
`;
