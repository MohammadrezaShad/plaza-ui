import styled, {css, CSSObject} from 'styled-components';

export const TooltipArrow = styled.span`
  color: ${({theme}) => theme.colors.text.primary};
  width: 1em;
  height: 0.71em;
  overflow: hidden;
  position: absolute;
  box-sizing: border-box;
  &::before {
    content: '';
    margin: auto;
    display: block;
    width: 100%;
    height: 100%;
    background-color: currentColor;
    transform: rotate(45deg);
  }
`;

export const TooltipPopper = styled.div<{
  $ownerState: any;
  open: boolean;
  $sx?: CSSObject;
}>`
  z-index: 1500;
  pointer-events: ${({$ownerState: ownerState, open}) =>
    !ownerState.disableInteractive || !open ? 'none' : null};
  ${({$ownerState: ownerState}) =>
    ownerState.arrow
      ? css`
          &[data-popper-placement*='bottom'] ${TooltipArrow} {
            top: 0;
            margin-top: -0.71em;
            &::before {
              transform-origin: 0 100%;
            }
          }
          &[data-popper-placement*='top'] ${TooltipArrow} {
            bottom: 0;
            margin-bottom: -0.71em;
            &::before {
              transform-origin: 100% 0;
            }
          }
          &[data-popper-placement*='right'] ${TooltipArrow} {
            ${ownerState.isRtl
              ? css`
                  left: 0;
                  margin-left: -0.71em;
                `
              : css`
                  right: 0;
                  margin-right: -0.71em;
                `};
            height: 1em;
            width: 0.71em;
            &::before {
              transform-origin: 100% 100%;
            }
          }
          &[data-popper-placement*='left'] ${TooltipArrow} {
            ${ownerState.isRtl
              ? css`
                  right: 0;
                  margin-right: -0.71em;
                `
              : css`
                  left: 0;
                  margin-left: -0.71em;
                `};
            height: 1em;
            width: 0.71em;
            &::before {
              transform-origin: 0 0;
            }
          }
        `
      : null}
  ${({$sx}) => $sx};
`;

export const TooltipTooltip = styled.div<{$ownerState: any}>`
  background-color: ${({theme}) => theme.colors.text.primary};
  color: ${({theme}) => theme.colors.text.invert};
  border-radius: ${({theme}) => theme.radius.medium};
  padding: ${({theme}) => `${theme.spacing(2)} ${theme.spacing(3)}`};
  max-width: ${({theme}) => theme.pxToRem(300)};
  margin: ${({theme}) => theme.spacing(1)};
  word-wrap: break-word;
  ${({$ownerState: ownerState}) =>
    ownerState.arrow
      ? css`
          position: relative;
          margin: 0;
        `
      : null};
  ${({theme}) => theme.typography.variants.body2};
  ${({$ownerState: ownerState, theme}) =>
    css`
      ${TooltipPopper}[data-popper-placement*='left'] & {
        transform-origin: right center;
        ${ownerState.isRtl
          ? css`
              margin-right: ${theme.spacing(3)};
            `
          : css`
              margin-left: ${theme.spacing(3)};
            `};
      }
      ${TooltipPopper}[data-popper-placement*='right'] & {
        transform-origin: left center;
        ${ownerState.isRtl
          ? css`
              margin-left: ${theme.spacing(3)};
            `
          : css`
              margin-right: ${theme.spacing(3)};
            `};
      }
      ${TooltipPopper}[data-popper-placement*='top'] & {
        transform-origin: center bottom;
        margin-bottom: ${theme.spacing(3)};
      }
      ${TooltipPopper}[data-popper-placement*='bottom'] & {
        transform-origin: center top;
        margin-top: ${theme.spacing(3)};
      }
    `}
`;
