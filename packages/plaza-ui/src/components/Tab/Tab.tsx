import React, {forwardRef, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import {TabsTextColor} from '../Tabs/Tabs';
import * as S from './Tab.styled';

export interface TabProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode | string;
  direction?: 'left' | 'right';
  disabled?: boolean;
  orientation?: 'horizontal' | 'vertical';
  component?: Component;
  value?: any;
  /**
   * Tab labels appear in a single row.
   * They can use a second line if needed.
   * @default false
   */
  wrapped?: boolean;
  label?: Element;
  indicator?: Element;
  icon?: Element | string;
  selectionFollowsFocus?: boolean;
  selected?: boolean;
  textColor?: TabsTextColor;
  fullWidth?: boolean;
  sx?: SxType;
  onClick?: (event: React.MouseEvent<HTMLDivElement>, value?: any) => void;
  onChange?: (
    event: React.FocusEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>,
    value?: any,
  ) => void;
}

const Tab = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      disabled,
      component,
      onChange,
      onFocus,
      textColor = 'inherit',
      fullWidth,
      label,
      icon,
      indicator,
      selectionFollowsFocus,
      selected,
      value,
      wrapped,
      onClick,
      sx,
      ...props
    }: TabProps,
    ref: Ref<T>,
  ) => {
    const ownerState = {
      ...props,
      disabled,
      selected,
      icon: !!icon,
      label: !!label,
      fullWidth,
      textColor,
      wrapped,
    };
    const sxStyles = useSxProp(sx);
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      if (disabled) return false;
      if (!selected && onChange) {
        onChange(event, value);
      }

      if (onClick) {
        onClick(event);
      }
    };

    const handleFocus = (event: React.FocusEvent<HTMLDivElement>) => {
      if (disabled) return false;

      if (selectionFollowsFocus && !selected && onChange) {
        onChange(event, value);
      }

      if (onFocus) {
        onFocus(event);
      }
    };
    return (
      <S.Tab
        as={component}
        role="tab"
        aria-selected={selected}
        disabled={disabled}
        onClick={handleClick}
        onFocus={handleFocus}
        tabIndex={selected ? 0 : -1}
        ref={ref as Ref<HTMLDivElement>}
        $ownerState={ownerState}
        $label={ownerState.label}
        $icon={ownerState.icon}
        $disabled={ownerState.disabled}
        $selected={ownerState.selected}
        $fullWidth={ownerState.fullWidth}
        $wrapped={ownerState.wrapped}
        $textColor={ownerState.textColor}
        sx={sxStyles}
        {...props}
      >
        {icon}
        {label}
        {children}
        {indicator}
      </S.Tab>
    );
  },
);
Tab.displayName = 'Tab';

export default Tab;
