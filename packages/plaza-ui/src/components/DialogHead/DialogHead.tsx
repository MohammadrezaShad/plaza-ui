import Close from '@plaza-ui/icons/lib/Close';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared/Main.types';
import Typography from '../Typography';
import * as S from './DialogHead.styled';
import {
  DialogHeadClasses,
  getDialogHeadUtilityClass,
} from './dialogHeadClasses';

export type DialogHeadProps = {
  children?: ReactNode;
  component?: Component;
  title?: string;
  onClose?: () => void;
  haCloseIcon?: boolean;
  sx?: SxType;
  classes?: Partial<DialogHeadClasses>;
  className?: string;
};

const useUtilityClasses = (ownerState: Pick<DialogHeadProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getDialogHeadUtilityClass, classes);
};

const DialogHead = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      component,
      title,
      haCloseIcon = true,
      onClose,
      sx,
      className,
      classes: inputClasses,
    }: DialogHeadProps,
    ref: Ref<T>,
  ) => {
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({classes: inputClasses});

    return (
      <S.Wrapper
        as={component}
        className={clsx(classes.root, className)}
        ref={ref}
        sx={sxStyles}
      >
        <Typography gutterLeft={3} variant="h4">
          {title}
        </Typography>
        {children}
        {haCloseIcon ? (
          <Close
            component={S.Icon}
            size={16}
            color="textPrimary"
            onClick={onClose}
          />
        ) : null}
      </S.Wrapper>
    );
  },
);

DialogHead.displayName = 'DialogHead';

export default DialogHead;
