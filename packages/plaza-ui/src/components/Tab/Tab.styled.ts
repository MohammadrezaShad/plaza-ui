/* eslint-disable no-nested-ternary */
import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import styled, {css, CSSObject} from 'styled-components';

import {TabsTextColor} from '../Tabs/Tabs';

export type TabStyledProps = {
  $label?: boolean;
  $icon?: boolean;
  $disabled?: boolean;
  $selected?: boolean;
  $fullWidth?: boolean;
  $wrapped?: boolean;
  $textColor: TabsTextColor;
  sx?: CSSObject;
};

export const Tab = styled.div<TabStyledProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
  background-color: transparent;
  outline: 0;
  border: 0;
  margin: 0;
  border-radius: 0;
  cursor: ${({$disabled}) => ($disabled ? 'default' : 'pointer')};
  user-select: none;
  vertical-align: middle;
  text-decoration: none;
  color: inherit;
  max-width: ${({theme}) => theme.pxToRem(360)};
  min-width: ${({theme}) => theme.pxToRem(90)};
  min-height: ${({theme}) => theme.pxToRem(48)};
  padding: ${({theme}) => `${theme.spacing(3)} ${theme.spacing(4)}`};
  flex-shrink: 0;
  overflow: hidden;
  white-space: normal;
  text-align: center;
  flex-direction: column;
  ${({theme}) => theme.typography.variants.button1};
  font-size: ${({theme, $wrapped}) =>
    $wrapped ? theme.typography.pxToRem(12) : null};
  ${({$fullWidth}) =>
    $fullWidth
      ? css`
          flex-shrink: 1;
          flex-grow: 1;
          flex-basis: 0;
          min-width: none;
        `
      : null};
  ${({$icon, $label, theme}) =>
    $icon && $label
      ? css`
          min-height: ${theme.typography.pxToRem(72)};
          padding-top: ${theme.spacing(3)};
          padding-bottom: ${theme.spacing(3)};
          & > *:first-child {
            margin-bottom: ${theme.spacing(1)};
          }
        `
      : null};

  ${({theme, $selected = false, $disabled = false, $textColor}) =>
    setTabColor(theme, $selected, $disabled, $textColor)};
  & > * {
    ${({theme, $selected = false, $disabled = false, $textColor}) =>
      setTabColor(theme, $selected, $disabled, $textColor)};
  }
`;

function setTabColor(
  theme: DefaultTheme,
  $selected: boolean,
  $disabled: boolean,
  $textColor: TabsTextColor,
) {
  const inheritColorStyles = css`
    color: inherit;
    opacity: ${$selected ? 1 : $disabled ? 0.3 : 0.6};
  `;

  const primaryColorStyles = css`
    color: ${$selected
      ? theme.colors.text.primary
      : theme.colors.text.secondary};
    opacity: ${$disabled ? 0.3 : null};
  `;

  const secondaryColorStyles = css`
    & * {
      color: ${$selected
        ? theme.colors.text.secondary
        : theme.colors.text.primary};
      opacity: ${$disabled ? 0.3 : null};
    }
  `;

  const colorStyles =
    $textColor === 'primary'
      ? primaryColorStyles
      : $textColor === 'secondary'
      ? secondaryColorStyles
      : inheritColorStyles;
  return colorStyles;
}
