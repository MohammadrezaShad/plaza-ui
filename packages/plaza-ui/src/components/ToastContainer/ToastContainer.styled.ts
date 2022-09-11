import {ToastContainer as ToastifyContainer} from 'react-toastify';
import styled, {CSSObject} from 'styled-components';

export const ToastContainer = styled(ToastifyContainer).attrs({
  className: 'toast-container',
  toastClassName: 'toast',
  bodyClassName: 'body',
  progressClassName: 'progress',
  rtl: true,
})<{toastMaxWidth: number; sx?: CSSObject}>`
  /* .toast-container*/
  max-width: ${({toastMaxWidth, theme}) => theme.pxToRem(toastMaxWidth)};
  min-width: ${({theme}) => theme.pxToRem(400)};

  /* .toast is passed to toastClassName */
  .toast {
    background: none;
    padding: 0;
  }

  button[aria-label='close'] {
    display: none;
  }

  /* .bodrtly is passed to bodyClassName */
  .body {
    padding: 0;
  }
  ${({sx}) => sx};
`;
