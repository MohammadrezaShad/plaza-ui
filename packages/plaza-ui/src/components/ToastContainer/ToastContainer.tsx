import './toast.min.css';

import React from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import * as S from './ToastContainer.styled';

export type ToastContainerProps = {
  autoClose?: number | false;
  toastMaxWidth?: number;
  sx?: SxType;
  hideProgressBar?: boolean;
};

const ToastContainer = ({
  autoClose = 3000,
  toastMaxWidth = 700,
  hideProgressBar = true,
  sx,
}: ToastContainerProps) => {
  const sxStyles = useSxProp(sx);
  return (
    <S.ToastContainer
      autoClose={autoClose}
      toastMaxWidth={toastMaxWidth}
      sx={sxStyles}
      hideProgressBar={hideProgressBar}
    />
  );
};

export default ToastContainer;
