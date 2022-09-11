import styled, {CSSObject} from 'styled-components';

export const Breadcrumbs = styled.div<{sx?: CSSObject}>`
  display: flex;
  white-space: nowrap;
  align-items: center;
  color: ${({theme}) => theme.colors.text.secondary};
  ${({theme}) => theme.typography.variants.caption};
  & * {
    color: currentColor;
    text-decoration: none;
    font: inherit;
  }
  & > :last-child {
    color: ${({theme}) => theme.colors.text.primary};
    cursor: default;
  }
  ${({sx}) => sx};
`;

export const Icon = styled.svg`
  flex-shrink: 0;
  margin: 0 ${({theme}) => theme.spacing(2)};
  color: ${({theme}) => theme.colors.primary.origin};
`;

export const HomeIcon = styled.svg`
  flex-shrink: 0;
  margin-left: ${({theme}) => theme.spacing(2)};
  color: ${({theme}) => theme.colors.primary.origin};
`;
