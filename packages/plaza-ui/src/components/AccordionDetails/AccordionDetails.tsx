import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import * as S from './AccordionDetails.styled';
import {getAccordionDetailsUtilityClass} from './accordionDetailsClasses';

export type AccordionDetailsProps = {
  children?: ReactNode;
  component?: Component;
  sx?: SxType;
  className?: string;
  classes?: Partial<any>;
};

const useUtilityClasses = (
  ownerState: Pick<AccordionDetailsProps, 'classes'>,
) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getAccordionDetailsUtilityClass, classes);
};

const AccordionDetails = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    props: AccordionDetailsProps,
    ref: Ref<T>,
  ) => {
    const {component, children, sx, className, classes: inputClasses} = props;
    const sxStyles = useSxProp(sx);
    const classes = useUtilityClasses({classes: inputClasses});

    return (
      <S.AccordionDetails
        as={component}
        className={clsx(classes.root, className)}
        ref={ref as Ref<HTMLDivElement>}
        sx={sxStyles}
      >
        {children}
      </S.AccordionDetails>
    );
  },
);
AccordionDetails.displayName = 'AccordionDetails';

export default AccordionDetails;
