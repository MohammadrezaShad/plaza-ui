/* eslint-disable no-nested-ternary */
import {CSSObject} from '@emotion/serialize';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import Color from 'color';
import React, {FC, useContext} from 'react';
import ReactSelect, {StylesConfig} from 'react-select';
import {CSSObject as StyledCSSObject, ThemeContext} from 'styled-components';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import * as S from './Select.styled';
import {getSelectUtilityClass, SelectClasses} from './selectClasses';

export interface IOptionType {
  label: string;
  value: string | number;
  isDisabled?: boolean;
}

type IsMulti = boolean;

export type SelectActionTypes =
  | 'clear'
  | 'create-option'
  | 'deselect-option'
  | 'pop-value'
  | 'remove-value'
  | 'select-option'
  | 'set-value';

export type SelectActionData = {
  action: SelectActionTypes;
  option: IOptionType;
};

export type SelectMenuPlacement = 'top' | 'bottom' | 'auto';

export type SelectProps = {
  options: IOptionType[];
  isDisabled?: boolean;
  hasSuccess?: boolean;
  hasError?: boolean;
  isLoading?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  placeholder?: string;
  name?: string;
  defaultValue?: IOptionType;
  value?: IOptionType;
  onChange?: (
    newValue: IOptionType | IOptionType[],
    action: SelectActionData,
  ) => void;
  isMulti?: IsMulti;
  menuIsOpen?: boolean;
  autoFocus?: boolean;
  closeMenuOnSelect?: boolean;
  closeMenuOnScroll?: boolean;
  menuPlacement?: SelectMenuPlacement;
  onBlur?: () => void;
  onFocus?: () => void;
  onInputChange?: () => void;
  onKeyDown?: () => void;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
  openMenuOnFocus?: boolean;
  openMenuOnClick?: boolean;
  noOptionsMessage?: string;
  sx?: SxType;
  className?: string;
  classes?: Partial<SelectClasses>;
};

const useUtilityClasses = (ownerState: Pick<SelectProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getSelectUtilityClass, classes);
};

const Select: FC<SelectProps> = ({
  options,
  isLoading,
  isClearable = false,
  isSearchable = false,
  isMulti = false,
  isDisabled = false,
  hasSuccess = false,
  hasError = true,
  name,
  placeholder = '',
  defaultValue,
  value,
  onChange,
  onBlur,
  onFocus,
  onInputChange,
  onKeyDown,
  onMenuOpen,
  onMenuClose,
  openMenuOnFocus = false,
  openMenuOnClick = true,
  menuIsOpen,
  autoFocus,
  closeMenuOnSelect,
  closeMenuOnScroll,
  menuPlacement = 'bottom',
  noOptionsMessage = 'موردی یافت نشد',
  sx,
  classes: inputClasses,
  className,
  ...props
}) => {
  const theme = useContext(ThemeContext);
  const customStyles: StylesConfig<IOptionType, IsMulti> = {
    control: (provided, state) => ({
      ...provided,
      outline: 'none',
      boxShadow: state.menuIsOpen ? theme.shadows.mediumOpacity[200] : 'none',
      minHeight: theme.pxToRem(40),
      borderRadius: theme.radius.medium,
      backgroundColor: theme.colors.background.origin,
      border: `1px solid ${getSelectBorderColor()}`,
      ...(theme.typography.variants.body2 as CSSObject),
      color: theme.colors.text.primary,
      opacity: state.isDisabled ? 0.3 : 1,
      zIndex: 5,
      '&:hover': {
        borderColor: getSelectBorderColor(),
      },
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    singleValue: provided => ({
      ...provided,
      margin: 0,
      color: theme.colors.text.primary,
    }),
    valueContainer: provided => ({
      ...provided,
      padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      padding: `${theme.spacing(1)} ${theme.spacing(4)}`,
      paddingRight: 0,
      SVG: {
        width: theme.pxToRem(12),
        transform: state.selectProps.menuIsOpen
          ? 'rotate(180deg)'
          : 'rotate(0)',
      },
      PATH: {
        fill: hasSuccess
          ? theme.colors.success.origin
          : hasError
          ? theme.colors.danger.origin
          : state.selectProps.menuIsOpen
          ? theme.colors.primary.origin
          : theme.colors.text.primary,
      },
    }),
    menu: (provided, state) => ({
      ...provided,
      margin: `${theme.pxToRem(-1)} 0 0 0`,
      borderRadius: theme.radius.medium,
      border: `1px solid ${theme.colors.stroke.origin}`,
      backgroundColor: theme.colors.background.origin,
      zIndex: 10,
      boxShadow: state.selectProps.menuIsOpen
        ? theme.shadows.lowOpacity[400]
        : 'none',
    }),
    menuList: provided => ({
      ...provided,
      padding: `${theme.spacing(4)} 0`,
      borderRadius: theme.radius.medium,
    }),
    option: (provided, {isSelected, isDisabled: isOptionDisabled}) => ({
      ...provided,
      padding: `${theme.spacing(3)} ${theme.spacing(4)}`,
      ...(theme.typography.variants.body2 as CSSObject),
      color: theme.colors.text.primary,
      ...(isOptionDisabled && (theme.disabledStyles as CSSObject)),
      background: isSelected
        ? `linear-gradient(0deg, ${Color.rgb(theme.colors.white)
            .alpha(0.9)
            .toString()}, ${Color.rgb(theme.colors.white)
            .alpha(0.9)
            .toString()}), ${theme.colors.primary.origin};`
        : 'transparent',
      '&:active': {
        background: `linear-gradient(0deg, ${Color.rgb(theme.colors.white)
          .alpha(0.9)
          .toString()}, ${Color.rgb(theme.colors.white)
          .alpha(0.9)
          .toString()}), ${theme.colors.primary.origin};`,
      },
      '&:hover': {
        ...(!isOptionDisabled && {
          cursor: isSelected ? 'default' : 'pointer',
          background: `linear-gradient(0deg, ${Color.rgb(theme.colors.white)
            .alpha(0.9)
            .toString()}, ${Color.rgb(theme.colors.white)
            .alpha(0.9)
            .toString()}), ${theme.colors.primary.origin};`,
        }),
      },
    }),
    noOptionsMessage: provided => ({
      ...provided,
      ...(theme.typography.variants.body1 as CSSObject),
      color: theme.colors.text.primary,
    }),
    multiValueLabel: provided => ({
      ...provided,
      color: theme.colors.text.primary,
    }),
    multiValue: provided => ({
      ...provided,
      borderRadius: theme.radius.large,
      padding: `0 ${theme.spacing(3)}`,
      minHeight: theme.pxToRem(24),
    }),
    multiValueRemove: (styles, {data}) => ({
      ...styles,
      color: theme.colors.text.primary,
      backgroundColor: 'transparent',
      width: theme.pxToRem(20),
      ':hover': {
        backgroundColor: 'transparent',
        color: theme.colors.text.primary,
      },
    }),
  };
  const sxStyles = useSxProp(sx);
  function getSelectBorderColor() {
    const border = {
      success: theme.colors.success.origin,
      error: theme.colors.danger.origin,
      default: theme.colors.stroke.origin,
    };
    return hasSuccess
      ? border.success
      : hasError
      ? border.error
      : border.default;
  }
  const classes = useUtilityClasses({classes: inputClasses});
  return (
    <S.Select
      className={clsx(classes.root, className)}
      as={ReactSelect}
      styles={customStyles}
      options={options}
      defaultValue={defaultValue}
      isSearchable={isSearchable}
      isLoading={isLoading}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isMulti={isMulti}
      value={value}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      noOptionsMessage={() => noOptionsMessage}
      menuIsOpen={menuIsOpen}
      autoFocus={autoFocus}
      closeMenuOnSelect={closeMenuOnSelect}
      closeMenuOnScroll={closeMenuOnScroll}
      menuPlacement={menuPlacement}
      onBlur={onBlur}
      onFocus={onFocus}
      onInputChange={onInputChange}
      onKeyDown={onKeyDown}
      onMenuOpen={onMenuOpen}
      onMenuClose={onMenuClose}
      openMenuOnFocus={openMenuOnFocus}
      openMenuOnClick={openMenuOnClick}
      sx={sxStyles}
      {...props}
    />
  );
};

export default Select;
