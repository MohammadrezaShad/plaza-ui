import * as React from 'react';
import styled from 'styled-components';

const Wrap = styled.span<{$open: boolean}>`
  top: ${({theme}) => theme.pxToRem(-34)};
  z-index: 1;
  position: absolute;
  transform: ${({$open}) =>
    $open ? `scale(1) translateY(-10px)` : `scale(0)`};
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  transform-origin: bottom center;
  ${({theme}) => theme.typography.variants.body2};
`;

const Content = styled.span`
  width: ${({theme}) => theme.pxToRem(32)};
  height: ${({theme}) => theme.pxToRem(32)};
  display: flex;
  transform: rotate(-45deg);
  align-items: center;
  border-radius: 50% 50% 50% 0;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.text.primary}; ;
`;

const Value = styled.span`
  color: ${({theme}) => theme.colors.text.invert};
  transform: rotate(45deg);
`;

export interface ValueLabelUnstyledProps {
  style?: React.CSSProperties;
  components?: {
    Root?: React.ElementType;
  };
  className?: string;
  value?: number | number[];
  valueLabelDisplay?: 'on' | 'auto' | 'off';
  children?: any;
  open: boolean;
  orientation: 'horizontal' | 'vertical';
}

function SliderValueLabelUnstyled(props: ValueLabelUnstyledProps) {
  const {children, className, value, open} = props;
  return React.cloneElement(
    children,
    {
      className,
    },
    <>
      {children.props.children}
      <Wrap aria-hidden $open={open}>
        <Content>
          <Value>{value}</Value>
        </Content>
      </Wrap>
    </>,
  );
}

export default SliderValueLabelUnstyled;
