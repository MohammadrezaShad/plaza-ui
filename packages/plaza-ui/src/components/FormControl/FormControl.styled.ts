import styled, {CSSObject} from 'styled-components';

export const FormControl = styled.div<{gutterBottom?: number; sx?: CSSObject}>`
  display: flex;
  flex-direction: column;
  &:not(:last-child) {
    margin-bottom: ${({theme, gutterBottom}) =>
      theme.spacing(gutterBottom || 5)};
  }
  ${({sx}) => sx};
`;
