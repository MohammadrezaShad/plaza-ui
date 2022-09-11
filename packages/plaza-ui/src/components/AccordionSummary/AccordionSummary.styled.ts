import styled, {css, CSSObject} from 'styled-components';

export const AccordionSummary = styled.div<{
  $disabled: boolean;
  $expanded: boolean;
  $disableGutters: boolean;
  sx?: CSSObject;
}>`
  color: inherit;
  border: 0;
  cursor: pointer;
  margin: 0;
  display: flex;
  outline: 0;
  position: relative;
  align-items: center;
  user-select: none;
  border-radius: 0;
  vertical-align: middle;
  justify-content: center;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  white-space: nowrap;

  ${({theme, $expanded, $disabled, $disableGutters}) => css`
    background-color: ${theme.colors.backgroundVariant.origin};
    min-height: ${$expanded && !$disableGutters
      ? theme.pxToRem(64)
      : theme.pxToRem(48)};
    cursor: ${$disabled ? 'default' : 'pointer'};
    padding: 0 ${theme.spacing(4)};
    transition: min-height ${theme.transition.duration},
      background-color ${theme.transition.duration};
  `};
  ${({$disabled, theme}) => ($disabled ? theme.disabledStyles : null)};
  ${({sx}) => sx};
`;

export const AccordionSummaryContent = styled.div<{
  $expanded: boolean;
  $disableGutters: boolean;
}>`
  display: flex;
  flex-grow: 1;
  margin: ${({theme}) => `${theme.spacing(3)} 0`};
  transition: ${({theme, $disableGutters}) =>
    $disableGutters ? `margin ${theme.transition.duration}` : null};
`;

export const AccordionSummaryIconWrap = styled.div<{$expanded: boolean}>`
  display: flex;
  transition: ${({theme}) => `transform ${theme.transition.duration}`};
  transform: ${({$expanded}) => ($expanded ? `rotate(180deg)` : `rotate(0)`)};
`;
