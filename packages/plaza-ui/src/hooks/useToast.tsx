import React, {ReactText} from 'react';
import {
  Bounce,
  Flip,
  Slide,
  toast as toastify,
  ToastPosition,
  ToastTransition,
  Zoom,
} from 'react-toastify';

import {AlertProps, AlertType} from '../components/Alert/Alert.types';
import Toast from '../components/Toast';

type ToastType = 'info' | 'success' | 'error' | 'warning';

interface ToastProps extends Omit<AlertProps, 'type'> {
  text?: string;
  position?: ToastPosition;
  disableAutoClose?: boolean;
  autoClose?: false | number;
  pauseOnHover?: boolean;
  type?: ToastType;
  draggable?: boolean;
  transition?: ToastTransition;
  title?: string;
  closeAction?: string;
  closeOnClick?: boolean;
  action?: string;
  onClick?: (event: React.MouseEvent) => void;
  width?: number;
  alertType?: AlertType;
  hasCloseAction?: boolean;
}

type GetToastArgs = {
  toastType?: ToastType;
  closeToast?: () => void;
  text?: string;
  title?: string;
  action?: string;
  onClick?: (event: React.MouseEvent) => void;
  closeAction?: string;
  width?: number;
  alertType?: AlertType;
  hasCloseAction?: boolean;
} & Partial<AlertProps>;

export const useToast = () => {
  const toast = (props: ToastProps = {}) => createToast(props);

  toast.info = (props: ToastProps = {}) => {
    const toastType: ToastType = 'info';
    const infoProps = {...props, type: toastType};
    return createToast(infoProps);
  };
  toast.success = (props: ToastProps = {}) => {
    const toastType: ToastType = 'success';
    const successProps = {...props, type: toastType};
    return createToast(successProps);
  };
  toast.error = (props: ToastProps = {}) => {
    const toastType: ToastType = 'error';
    const errorProps = {...props, type: toastType};
    return createToast(errorProps);
  };
  toast.warning = (props: ToastProps = {}) => {
    const toastType: ToastType = 'warning';
    const warningProps = {...props, type: toastType};
    return createToast(warningProps);
  };

  toast.dismiss = (toastId: ReactText) => {
    toastify.dismiss(toastId);
  };

  toast.dismissAll = () => {
    toastify.dismiss();
  };

  toast.update = (
    toastId: ReactText,
    {
      position = toastify.POSITION.BOTTOM_LEFT,
      transition = Flip,
      closeOnClick = false,
      autoClose,
      disableAutoClose,
      draggable,
      pauseOnHover,
      text,
      title,
      closeAction,
      action,
      onClick,
      type = 'info',
    }: ToastProps = {},
  ) => {
    const options = {
      position,
      transition,
      closeOnClick,
      autoClose,
      disableAutoClose,
      draggable,
      pauseOnHover,
      render: getToast({
        closeToast: () => toast.dismiss(toastId),
        toastType: type,
        text,
        title,
        closeAction,
        action,
        onClick,
      }),
    };
    toastify.update(toastId, options);
  };

  const createToast = ({
    position = toastify.POSITION.BOTTOM_LEFT,
    transition = Flip,
    closeOnClick = false,
    autoClose,
    disableAutoClose,
    draggable,
    pauseOnHover,
    text,
    title,
    closeAction,
    type = 'info',
    action,
    width,
    onClick,
    ...otherToastProps
  }: ToastProps = {}) => {
    const options = {
      position,
      transition,
      closeOnClick,
      autoClose,
      disableAutoClose,
      draggable,
      pauseOnHover,
      text,
      title,
    };
    return toastify(
      ({closeToast}) =>
        getToast({
          closeToast,
          toastType: type,
          text,
          title,
          closeAction,
          action,
          onClick,
          width,
          ...otherToastProps,
        }),
      options,
    );
  };

  toast.position = toastify.POSITION;

  const getToast = ({
    closeToast,
    toastType = 'info',
    text,
    title,
    closeAction,
    action,
    onClick,
    width,
    alertType,
    hasCloseAction,
    ...otherToastProps
  }: GetToastArgs) => (
    <Toast
      text={text}
      title={title}
      severity={toastType}
      type={alertType}
      closeAction={hasCloseAction ? closeAction : undefined}
      closeToast={closeToast}
      action={action}
      onClick={onClick}
      width={width}
      {...otherToastProps}
    />
  );

  toast.transition = {
    Flip,
    Bounce,
    Zoom,
    Slide,
  };

  return toast;
};
