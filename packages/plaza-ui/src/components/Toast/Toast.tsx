import React, {FC} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import Alert from '../Alert';
import {AlertProps} from '../Alert/Alert.types';

type ToastProps = {
  closeToast?: () => void;
} & AlertProps;

const Toast: FC<ToastProps> = ({
  text,
  severity,
  closeToast,
  title,
  closeAction = 'بستن',
  action,
  onClick,
  width,
  sx,
  ...otherProps
}) => (
  <Alert
    text={text}
    severity={severity}
    closeAction={closeAction}
    title={title}
    onClose={closeToast}
    action={action}
    onClick={onClick}
    width={width}
    sx={sx}
    {...otherProps}
  />
);

export default Toast;
