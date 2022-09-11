import styled, {CSSObject} from 'styled-components';

import {SelectAnimation} from './LineTab';

type StyledTab = {
  selected: boolean;
  selectedValue?: number;
  value?: number;
  prevSelectedValue?: number;
  animation?: SelectAnimation;
};

export const Tab = styled.div<{sx?: CSSObject}>`
  flex: 1 0 0;
  cursor: pointer;
  padding: ${({theme}) => theme.spacing(3)} ${({theme}) => theme.spacing(2)};
  ${({sx}) => sx};
`;

export const Content = styled.div<StyledTab>`
  height: ${({theme}) => theme.pxToRem(2)};
  background-color: ${({theme}) => theme.colors.strokeVariant.origin};
  position: relative;
  overflow: hidden;
  &::after {
    position: absolute;
    transition: 0.3s;
    content: '';
    width: ${({selected, animation}) =>
      selected || animation === 'fade' ? '100%' : '0px'};
    right: ${({animation}) => (animation === 'move' ? getTabRight : 0)};
    opacity: ${({selected, animation}) =>
      animation === 'move' || selected ? 1 : 0};
    left: 0;
    bottom: 0;
    height: 3px;
    background-color: ${({theme}) => theme.colors.primary.origin};
  }
`;

function getTabRight({
  selected,
  value,
  selectedValue,
  prevSelectedValue,
}: StyledTab) {
  const isValueNumber = typeof value === 'number';
  const isSelectedValueNumber = typeof selectedValue === 'number';
  const isPrevSelectedValueNumber = typeof prevSelectedValue === 'number';

  if (
    isValueNumber &&
    isSelectedValueNumber &&
    (selectedValue as number) > (value as number)
  ) {
    return 'auto';
  }
  if (
    isPrevSelectedValueNumber &&
    isSelectedValueNumber &&
    selected &&
    (selectedValue as number) < (prevSelectedValue as number)
  ) {
    return 'auto';
  }
  if (selected) {
    return 0;
  }
  return 0;
}
