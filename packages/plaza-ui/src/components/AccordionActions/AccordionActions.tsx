import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import * as S from './AccordionActions.styled';
import {
  AccordionActionsClasses,
  getAccordionActionsUtilityClass,
} from './accordionActionsClasses';

export type AccordionActionsProps = {
  children?: ReactNode;
  component?: Component;
  disableSpacing?: boolean;
  sx?: SxType;
  classes?: Partial<AccordionActionsClasses>;
  className?: string;
};

const useUtilityClasses = (
  ownerState: Pick<AccordionActionsProps, 'classes' | 'disableSpacing'>,
) => {
  const {classes, disableSpacing} = ownerState;

  const slots = {
    root: ['root', !disableSpacing && 'spacing'],
  };

  return composeClasses(slots, getAccordionActionsUtilityClass, classes);
};

const AccordionActions = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    props: AccordionActionsProps,
    ref: Ref<T>,
  ) => {
    const {
      children,
      component,
      disableSpacing,
      classes: inputClasses,
      className,
      sx,
      ...otherProps
    } = props;

    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({disableSpacing, classes: inputClasses});

    return (
      <S.AccordionActions
        ref={ref as Ref<HTMLDivElement>}
        className={clsx(classes.root, className)}
        as={component}
        $disableSpacing={disableSpacing}
        sx={sxStyles}
        {...otherProps}
      >
        {children}
      </S.AccordionActions>
    );
  },
);
AccordionActions.displayName = 'AccordionActions';

export default AccordionActions;
