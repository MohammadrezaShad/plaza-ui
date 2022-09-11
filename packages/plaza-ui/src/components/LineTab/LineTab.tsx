import {usePrevious} from '@plaza-ui/hooks/lib/usePrevious';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {FC, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import * as S from './LineTab.styled';
import {getLineTabUtilityClass, LineTabClasses} from './lineTabClasses';

export type SelectAnimation = 'move' | 'fade';

export type LineTabProps = {
  children?: ReactNode;
  value?: number;
  onChange?: (event: React.MouseEvent, value?: number | string) => void;
  selected?: boolean;
  selectedValue?: number;
  component?: Component;
  animation?: SelectAnimation;
  sx?: SxType;
  classes?: Partial<LineTabClasses>;
  className?: string;
};

const useUtilityClasses = (ownerState: Pick<LineTabProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
    content: ['content'],
  };

  return composeClasses(slots, getLineTabUtilityClass, classes);
};

const LineTab: FC<LineTabProps> = ({
  onChange,
  value,
  selected = false,
  selectedValue,
  component,
  animation = 'fade',
  sx,
  classes: inputClasses,
  className,
}) => {
  const prevSelectedValue = usePrevious(selectedValue);
  const handleClick = (event: React.MouseEvent) => {
    onChange && onChange(event, value);
  };
  const sxStyles = useSxProp(sx);
  const ownerState = {
    classes: inputClasses,
  };

  const classes = useUtilityClasses(ownerState);

  return (
    <S.Tab
      className={clsx(classes.root, className)}
      onClick={handleClick}
      as={component}
      sx={sxStyles}
    >
      <S.Content
        className={classes.content}
        selected={selected}
        selectedValue={selectedValue}
        value={value}
        prevSelectedValue={prevSelectedValue}
        animation={animation}
      />
    </S.Tab>
  );
};

export default React.memo(LineTab);
