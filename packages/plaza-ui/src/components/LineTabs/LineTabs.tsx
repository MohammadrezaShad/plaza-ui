import React, {FC, ReactNode} from 'react';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {useTabs} from '../../hooks/useTabs';
import {Component} from '../../shared';
import * as S from './LineTabs.styled';

type LineTabsProps = {
  children?: ReactNode;
  value?: number;
  onChange?: (event: React.MouseEvent, value: number) => void;
  component?: Component;
  sx?: SxType;
};

const LineTabs: FC<LineTabsProps> = ({
  children,
  value,
  component,
  onChange,
  sx,
}) => {
  const {childrenWithProps, tabListRef, tabsRef} = useTabs({
    children,
    value,
    onChange,
  });
  const sxStyles = useSxProp(sx);
  return (
    <S.Wrap as={component} ref={tabsRef} sx={sxStyles}>
      <S.TabsList ref={tabListRef}>{childrenWithProps}</S.TabsList>
    </S.Wrap>
  );
};

export default LineTabs;
