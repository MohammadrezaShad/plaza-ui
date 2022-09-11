import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {forwardRef, Ref} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component, TransitionProps as TransitionPropsType} from '../../shared';
import Collapse from '../Collapse';
import * as S from './Accordion.styled';
import {AccordionClasses, getAccordionUtilityClass} from './accordionClasses';
import AccordionContext from './AccordionContext';

export type AccordionProps = {
  children: NonNullable<React.ReactNode>;
  defaultExpanded?: boolean;
  disabled?: boolean;
  disableGutters?: boolean;
  expanded?: boolean;
  onChange?: (event: React.SyntheticEvent, expanded: boolean) => void;
  TransitionComponent?: React.JSXElementConstructor<
    TransitionPropsType & {children?: React.ReactElement<any, any>}
  >;
  square?: boolean;
  TransitionProps?: TransitionPropsType;
  component?: Component;
  className?: string;
  classes?: Partial<AccordionClasses>;
  sx?: SxType;
};

const useUtilityClasses = (
  ownerState: Pick<
    AccordionProps,
    'classes' | 'square' | 'expanded' | 'disabled' | 'disableGutters'
  >,
) => {
  const {classes, square, expanded, disabled, disableGutters} = ownerState;

  const slots = {
    root: [
      'root',
      !square && 'rounded',
      expanded && 'expanded',
      disabled && 'disabled',
      !disableGutters && 'gutters',
    ],
    region: ['region'],
  };

  return composeClasses(slots, getAccordionUtilityClass, classes);
};

const Accordion = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    props: AccordionProps,
    ref: Ref<T>,
  ) => {
    const {
      children: childrenProp,
      component,
      className,
      defaultExpanded = false,
      disabled = false,
      disableGutters = true,
      expanded: expandedProp,
      onChange,
      square = false,
      TransitionComponent = Collapse,
      TransitionProps,
      sx,
      ...otherProps
    } = props;

    const [expanded, setExpandedState] = useControlled({
      controlled: expandedProp,
      default: defaultExpanded,
      name: 'Accordion',
      state: 'expanded',
    });

    const ownerState = {
      ...props,
      square,
      disabled,
      disableGutters,
      expanded,
    };

    const classes = useUtilityClasses(ownerState);

    const handleChange = React.useCallback(
      event => {
        setExpandedState(!expanded);

        if (onChange) {
          onChange(event, !expanded);
        }
      },
      [expanded, onChange, setExpandedState],
    );

    const [summary, ...children] = React.Children.toArray(childrenProp);
    const contextValue = React.useMemo(
      () => ({expanded, disabled, disableGutters, toggle: handleChange}),
      [expanded, disabled, disableGutters, handleChange],
    );
    const sxStyles = useSxProp(sx);

    return (
      <S.Accordion
        as={component}
        className={clsx(classes.root, className)}
        ref={ref as Ref<HTMLDivElement>}
        $square={square}
        $disableGutters={disableGutters}
        $expanded={expanded}
        $disabled={disabled}
        sx={sxStyles}
        {...otherProps}
      >
        <AccordionContext.Provider value={contextValue}>
          {summary}
        </AccordionContext.Provider>
        <TransitionComponent in={expanded} {...TransitionProps}>
          <S.Region role="region" className={classes.region}>
            {children}
          </S.Region>
        </TransitionComponent>
      </S.Accordion>
    );
  },
);
Accordion.displayName = 'Accordion';

export default Accordion;
