import ChevronLeft from '@plaza-ui/icons/lib/ChevronLeft';
import ChevronRight from '@plaza-ui/icons/lib/ChevronRight';
import React, {forwardRef, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import {TabsOrientation} from '../Tabs/Tabs';
import * as S from './TabScrollButton.styled';

export interface TabScrollButtonProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  direction: 'left' | 'right';
  disabled?: boolean;
  orientation: TabsOrientation;
  component?: Component;
  sx?: SxType;
}

const TabScrollButton = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      direction,
      disabled,
      orientation,
      component,
      sx,
      ...props
    }: TabScrollButtonProps,
    ref: Ref<T>,
  ) => {
    const sxStyles = useSxProp(sx);
    return (
      <S.TabButton
        as={component}
        ref={ref as Ref<HTMLDivElement>}
        tabIndex={null}
        $disabled={disabled}
        $orientation={orientation}
        sx={sxStyles}
        {...props}
      >
        {direction === 'left' ? <ChevronLeft /> : <ChevronRight />}
      </S.TabButton>
    );
  },
);
TabScrollButton.displayName = 'TabScrollButton';

export default TabScrollButton;
