import styled, {CSSObject} from 'styled-components';

export const Stepper = styled.div<{sx?: CSSObject}>`
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
  border-radius: ${({theme}) => theme.radius.medium};
  border: 1px solid ${({theme}) => theme.colors.stroke.origin};
  min-height: ${({theme}) => theme.pxToRem(19)};
  & > * {
    flex-shrink: 0;
  }
  ${({sx}) => sx};
`;

export const ActionButton = styled.span<{$isDisabled: boolean}>`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  cursor: ${({$isDisabled}) => ($isDisabled ? 'default' : 'pointer')};
  height: ${({theme}) => theme.pxToRem(19)};
  width: ${({theme}) => theme.pxToRem(19)};
  ${({$isDisabled, theme}) => ($isDisabled ? theme.disabledStyles : null)};
  transition: all ${({theme}) => theme.transition.duration};
`;

export const Typography = styled.span`
  text-align: center;
  min-width: ${({theme}) => theme.pxToRem(12)};
`;
