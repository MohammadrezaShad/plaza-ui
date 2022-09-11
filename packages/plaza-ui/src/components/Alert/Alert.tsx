/* eslint-disable no-nested-ternary */
/* eslint-disable arrow-body-style */
import Close from '@plaza-ui/icons/lib/Close';
import Danger from '@plaza-ui/icons/lib/Danger';
import Info from '@plaza-ui/icons/lib/Info';
import Success from '@plaza-ui/icons/lib/Success';
import Warning from '@plaza-ui/icons/lib/Warning';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {FC} from 'react';

import useSxProp from '../../hooks/useSxProp';
import capitalize from '../../utils/capitalize';
import Button from '../Button';
import * as S from './Alert.styled';
import {AlertProps} from './Alert.types';
import {getAlertUtilityClass} from './alertClasses';

const useUtilityClasses = (
  ownerState: Pick<AlertProps, 'classes' | 'color' | 'severity' | 'variant'>,
) => {
  const {variant, color, severity, classes} = ownerState;

  const slots = {
    root: ['root', `${variant}${capitalize(color || severity)}`, `${variant}`],
    icon: ['icon'],
    message: ['message'],
    action: ['action'],
    container: ['container'],
    actions: ['actions'],
    wrap: ['wrap'],
    head: ['head'],
    title: ['title'],
  };

  return composeClasses(slots, getAlertUtilityClass, classes);
};

const Alert: FC<AlertProps> = ({
  severity = 'info',
  action,
  title,
  text,
  children,
  icon,
  hasIcon = true,
  closeAction,
  size = 'medium',
  type = 'modal',
  actionType = type === 'inline' ? 'outlined' : 'contained',
  closeActionType = type === 'inline'
    ? 'text'
    : action
    ? 'outlined'
    : 'contained',
  onClose,
  onClick,
  variant = type === 'inline' ? 'filled' : 'standard',
  width,
  sx,
  color,
  className,
  classes: inputClasses,
}) => {
  const sxStyles = useSxProp(sx);

  const renderIcon = () => {
    if (hasIcon && !icon) {
      return (
        <S.Block $type={type}>
          <S.IconWrap
            $size={size}
            $type={type}
            $severity={severity}
            $variant={variant}
          >
            {getAlertDefaultIcon()}
          </S.IconWrap>
        </S.Block>
      );
    }
    return <S.Block $type={type}>{icon}</S.Block>;
  };

  const getAlertDefaultIcon = () => {
    switch (severity) {
      case 'success':
        return (
          <Success color={getIconColor()} size={24} className={classes.icon} />
        );
      case 'error':
        return (
          <Danger color={getIconColor()} size={24} className={classes.icon} />
        );
      case 'warning':
        return (
          <Warning color={getIconColor()} size={24} className={classes.icon} />
        );
      case 'info':
      default:
        return (
          <Info color={getIconColor()} size={24} className={classes.icon} />
        );
    }
  };

  const getIconColor = () => {
    if (type === 'modal' || size === 'medium' || variant !== 'filled')
      return 'background';
    switch (severity) {
      case 'error':
        return 'danger';
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  const renderMainAction = () => {
    if (action && typeof action === 'string') {
      return (
        <Button
          component={S.Action}
          variant={actionType}
          color={getAlertActionColor()}
          onClick={onClick}
          className={classes.action}
        >
          {action}
        </Button>
      );
    }
    if (action) return <S.Action>{action}</S.Action>;
    return action;
  };

  const renderInlineCloseAction = () => {
    if (closeAction && typeof closeAction === 'string') {
      return (
        <Button
          component={S.Action}
          variant="text"
          color={getAlertActionColor()}
          onClick={onClose}
          className={classes.action}
        >
          <Close size={16} />
        </Button>
      );
    }
    if (closeAction) return <S.Action>{closeAction}</S.Action>;
    return closeAction;
  };

  const renderInlineMainAction = () => {
    if (action && typeof action === 'string') {
      return (
        <Button
          component={S.Action}
          variant={actionType}
          color="textPrimary"
          onClick={onClick}
          className={classes.action}
        >
          {action}
        </Button>
      );
    }
    if (action) return <S.Action>{action}</S.Action>;
    return action;
  };

  const renderCloseAction = () => {
    if (closeAction && typeof closeAction === 'string') {
      return (
        <Button
          component={S.Action}
          variant={closeActionType}
          color={getAlertActionColor()}
          onClick={onClose}
          className={classes.action}
        >
          {closeAction}
        </Button>
      );
    }
    if (closeAction) return <S.Action>{closeAction}</S.Action>;
    return closeAction;
  };

  const getAlertActionColor = () => {
    switch (severity) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'info':
      default:
        return 'info';
    }
  };

  const ownerState = {
    color,
    severity,
    variant,
    classes: inputClasses,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <S.Alert
      sx={sxStyles}
      className={clsx(classes.root, className)}
      $variant={variant}
      $severity={severity}
      $width={width}
      $type={type}
    >
      <S.Container $size={size} className={classes.container}>
        {renderIcon()}
        <S.Wrap className={classes.wrap}>
          {title ? (
            <S.Head className={classes.head}>
              {title ? (
                <S.Title
                  className={classes.title}
                  $variant={variant}
                  $severity={severity}
                  $type={type}
                >
                  {title}
                </S.Title>
              ) : null}
            </S.Head>
          ) : null}
          {text ? (
            <S.Text
              $variant={variant}
              $severity={severity}
              $type={type}
              className={classes.message}
            >
              {text}
            </S.Text>
          ) : null}
        </S.Wrap>
        {type === 'inline' && (closeAction || action) ? (
          <S.InlineActions className={classes.actions}>
            {renderInlineMainAction()}
            {renderInlineCloseAction()}
          </S.InlineActions>
        ) : null}
      </S.Container>
      {type === 'modal' && (closeAction || action) ? (
        <S.Bottom className={classes.actions}>
          {renderCloseAction()}
          {renderMainAction()}
        </S.Bottom>
      ) : null}
      {children}
    </S.Alert>
  );
};

export default Alert;
