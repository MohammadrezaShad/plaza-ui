import ChevronDown from '@plaza-ui/icons/lib/ChevronDown';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, ReactNode, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import AccordionContext, {
  AccordionContextProps,
} from '../Accordion/AccordionContext';
import {ButtonProps} from '../Button/Button.types';
import * as S from './AccordionSummary.styled';
import {
  AccordionSummaryClasses,
  getAccordionSummaryUtilityClass,
} from './accordionSummaryClasses';

export type AccordionSummaryProps = {
  children?: ReactNode;
  component?: Component;
  expandIcon?: React.ReactNode;
  className?: string;
  sx?: SxType;
  classes?: Partial<AccordionSummaryClasses>;
  disableGutters?: boolean;
  expanded?: boolean;
} & ButtonProps;

const useUtilityClasses = (
  ownerState: Pick<
    AccordionSummaryProps,
    'classes' | 'expanded' | 'disabled' | 'disableGutters'
  >,
) => {
  const {classes, expanded, disabled, disableGutters} = ownerState;

  const slots = {
    root: [
      'root',
      expanded && 'expanded',
      disabled && 'disabled',
      !disableGutters && 'gutters',
    ],
    focusVisible: ['focusVisible'],
    content: [
      'content',
      expanded && 'expanded',
      !disableGutters && 'contentGutters',
    ],
    expandIconWrapper: ['expandIconWrapper', expanded && 'expanded'],
  };

  return composeClasses(slots, getAccordionSummaryUtilityClass, classes);
};

const AccordionSummary = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    props: AccordionSummaryProps,
    ref: Ref<T>,
  ) => {
    const {
      children,
      className,
      component,
      expandIcon = <ChevronDown size={20} />,
      onClick,
      sx,
      ...otherProps
    } = props;
    const {disabled, expanded, disableGutters, toggle} = React.useContext(
      AccordionContext,
    ) as AccordionContextProps;

    const handleChange = (event: React.MouseEvent<Element, MouseEvent>) => {
      if (toggle) {
        toggle();
      }
      if (onClick) {
        onClick(event);
      }
    };
    const sxStyles = useSxProp(sx);

    const ownerState = {
      ...props,
      expanded,
      disabled,
      disableGutters,
    };

    const classes = useUtilityClasses(ownerState);

    return (
      <S.AccordionSummary
        className={clsx(classes.root, className)}
        as={component}
        ref={ref as Ref<HTMLDivElement>}
        onClick={handleChange}
        $disabled={disabled}
        $disableGutters={disableGutters}
        $expanded={expanded}
        sx={sxStyles}
        {...otherProps}
      >
        <S.AccordionSummaryContent
          $disableGutters={disableGutters}
          $expanded={expanded}
        >
          {children}
        </S.AccordionSummaryContent>
        {expandIcon && (
          <S.AccordionSummaryIconWrap $expanded={expanded}>
            {expandIcon}
          </S.AccordionSummaryIconWrap>
        )}
      </S.AccordionSummary>
    );
  },
);
AccordionSummary.displayName = 'AccordionSummary';

export default AccordionSummary;
