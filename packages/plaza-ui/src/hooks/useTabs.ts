/* Utils */
import {off, on} from '@plaza-ui/utils/lib/main';
import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

export type UseTabsProps = {
  children?: ReactNode;
  value?: number;
  onChange?: (event: React.MouseEvent, value: number) => void;
};

export const useTabs = ({children, value, onChange}: UseTabsProps) => {
  const valueToIndex = new Map();
  const tabsRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 0,
    startValue: 0,
  });
  let childIndex = 0;
  const childrenWithProps = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return null;
    }

    const childValue =
      child.props.value === undefined ? childIndex : child.props.value;
    valueToIndex.set(childValue, childIndex);
    const selected = childValue === value;
    childIndex += 1;
    return React.cloneElement(child, {
      selected,
      onChange,
      selectedValue: value,
      value: childValue,
    });
  });

  const getTabsMeta = useCallback(() => {
    const tabsNode = tabsRef.current;
    let tabsMeta;
    if (tabsNode) {
      const rect = tabsNode.getBoundingClientRect();
      tabsMeta = {
        clientWidth: tabsNode.clientWidth,
        scrollLeft: tabsNode.scrollLeft,
        scrollTop: tabsNode.scrollTop,
        scrollWidth: tabsNode.scrollWidth,
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
      };
    }

    let tabMeta;
    if (tabsNode) {
      const tabChildren = tabListRef.current?.children;

      if (tabChildren && tabChildren.length > 0) {
        const tab = tabChildren?.[valueToIndex.get(value)];
        tabMeta = tab ? tab.getBoundingClientRect() : null;
      }
    }
    return {tabsMeta, tabMeta};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const updateIndicatorStyled = useCallback(() => {
    const {tabMeta, tabsMeta} = getTabsMeta();
    if (!tabMeta || !tabsMeta) return;
    const correction = tabsMeta.clientWidth - tabsMeta.scrollWidth;
    const startValue = tabMeta?.left - tabsMeta?.left + correction;
    const size = tabMeta.width;
    setIndicatorStyle({startValue, width: size});
  }, [getTabsMeta]);

  useEffect(() => {
    updateIndicatorStyled();
  }, [updateIndicatorStyled]);

  useEffect(() => {
    on(window, 'resize', updateIndicatorStyled);
    return () => {
      off(window, 'resize', updateIndicatorStyled);
    };
  }, [updateIndicatorStyled]);
  return {tabsRef, tabListRef, childrenWithProps, indicatorStyle};
};
