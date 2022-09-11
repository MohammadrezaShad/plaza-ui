import styled, {CSSObject} from 'styled-components';

export type TabStyledPanelProps = {
  index: number;
  value: number;
  sx?: CSSObject;
};

export const Wrap = styled.div<TabStyledPanelProps>`
  display: ${({index, value}) => (index === value ? 'block' : 'none')};
`;
