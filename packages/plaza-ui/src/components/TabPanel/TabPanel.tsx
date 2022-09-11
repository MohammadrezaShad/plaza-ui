import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import React, {FC} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import * as S from './TabPanel.styled';
import {getTabPanelUtilityClass, TabPanelClasses} from './tabPanelClasses';

export type TabPanelProps = {
  index: number;
  value: number;
  sx?: SxType;
  className?: string;
  classes?: Partial<TabPanelClasses>;
  children?: React.ReactNode;
};

const useUtilityClasses = (ownerState: Pick<TabPanelProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTabPanelUtilityClass, classes);
};

const TabPanel: FC<TabPanelProps> = ({
  index,
  value,
  children,
  sx,
  className,
  classes: inputClasses,
}) => {
  const sxStyles = useSxProp(sx);
  const classes = useUtilityClasses({classes: inputClasses});

  return (
    <S.Wrap
      className={clsx(classes.root, className)}
      index={index}
      value={value}
      sx={sxStyles}
    >
      {children}
    </S.Wrap>
  );
};

export default TabPanel;
