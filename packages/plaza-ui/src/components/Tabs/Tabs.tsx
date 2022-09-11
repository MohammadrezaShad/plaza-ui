/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {useEventCallback} from '@plaza-ui/hooks/lib/useEventCallback';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import {debounce} from '@plaza-ui/utils/lib/debounce';
import {ownerDocument} from '@plaza-ui/utils/lib/ownerDocument';
import {ownerWindow} from '@plaza-ui/utils/lib/ownerWindow';
import {
  detectScrollType,
  getNormalizedScrollLeft,
} from '@plaza-ui/utils/lib/scrollLeft';
import clsx from 'clsx';
import React, {forwardRef, Ref, useContext} from 'react';
import {ThemeContext} from 'styled-components';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component} from '../../shared';
import animate from '../../utils/animate';
import TabScrollButton, {
  TabScrollButtonProps as TabScrollBtnProps,
} from '../TabScrollButton/TabScrollButton';
import * as S from './Tabs.tyled';
import {getTabsUtilityClass, TabsClasses} from './tabsClasses';

export interface TabsActions {
  updateIndicator(): void;
  updateScrollButtons(): void;
}

export type TabsIndicatorColor = 'secondary' | 'primary';
export type TabsOrientation = 'horizontal' | 'vertical';
export type TabsTextColor = 'secondary' | 'primary' | 'inherit';
export type TabsVariant = 'standard' | 'scrollable' | 'fullWidth';
export type ScrollButtons = 'auto' | true | false;

export type TabsProps = {
  action?: React.Ref<TabsActions>;

  allowScrollButtonsMobile?: boolean;

  'aria-label'?: string;

  'aria-labelledby'?: string;

  centered?: boolean;

  children?: React.ReactNode;

  indicatorColor?: TabsIndicatorColor;

  onChange?: (event: React.SyntheticEvent, value: any) => void;

  orientation?: TabsOrientation;

  ScrollButtonComponent?: React.ElementType;

  scrollButtons?: ScrollButtons;

  selectionFollowsFocus?: boolean;

  TabIndicatorProps?: Partial<React.HTMLAttributes<HTMLDivElement>>;

  TabScrollButtonProps?: Partial<TabScrollBtnProps>;

  textColor?: TabsTextColor;

  value?: any;

  variant?: TabsVariant;
  hasBorder?: boolean;
  visibleScrollbar?: boolean;
  component?: Component;
  sx?: SxType;
  className?: string;
  classes?: Partial<TabsClasses>;
};

const nextItem = (list: HTMLElement, item: HTMLElement) => {
  if (list === item) {
    return list.firstChild;
  }
  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }
  return list.firstChild;
};

const previousItem = (list: HTMLElement, item: HTMLElement) => {
  if (list === item) {
    return list.lastChild;
  }
  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }
  return list.lastChild;
};

const moveFocus = (
  list: HTMLElement | null,
  currentFocus: Element | null,
  traversalFunction: Function,
) => {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus);

  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === (list as HTMLElement).firstChild) {
      if (wrappedOnce) {
        return;
      }
      wrappedOnce = true;
    }

    // Same logic as useAutocomplete.js
    const nextFocusDisabled =
      nextFocus.disabled || nextFocus.getAttribute('aria-disabled') === 'true';

    if (!nextFocus.hasAttribute('tabindex') || nextFocusDisabled) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      nextFocus.focus();
      return;
    }
  }
};

const defaultIndicatorStyle: any = {};
let warnedOnceTabPresent = false;

type OwnerState = {
  vertical: boolean;
  fixed: boolean;
  hideScrollbar: boolean;
  scrollableX: boolean;
  scrollableY: boolean;
  centered: boolean;
  scrollButtonsHideMobile: boolean;
  classes?: Partial<TabsClasses>;
};

const useUtilityClasses = (ownerState: OwnerState) => {
  const {
    vertical,
    fixed,
    hideScrollbar,
    scrollableX,
    scrollableY,
    centered,
    scrollButtonsHideMobile,
    classes,
  } = ownerState;

  const slots = {
    root: ['root', vertical && 'vertical'],
    scroller: [
      'scroller',
      fixed && 'fixed',
      hideScrollbar && 'hideScrollbar',
      scrollableX && 'scrollableX',
      scrollableY && 'scrollableY',
    ],
    flexContainer: [
      'flexContainer',
      vertical && 'flexContainerVertical',
      centered && 'centered',
    ],
    indicator: ['indicator'],
    scrollButtons: [
      'scrollButtons',
      scrollButtonsHideMobile && 'scrollButtonsHideMobile',
    ],
    scrollableX: [scrollableX && 'scrollableX'],
    hideScrollbar: [hideScrollbar && 'hideScrollbar'],
  };

  return composeClasses(slots, getTabsUtilityClass, classes);
};

const Tabs = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(props: TabsProps, ref: Ref<T>) => {
    const theme = useContext(ThemeContext);
    const isRtl = theme.direction === 'rtl';
    const {
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      action,
      centered = false,
      children: childrenProp,
      component = 'div',
      allowScrollButtonsMobile = false,
      indicatorColor = 'primary',
      onChange,
      orientation = 'horizontal',
      ScrollButtonComponent = TabScrollButton,
      scrollButtons = 'auto',
      selectionFollowsFocus,
      TabIndicatorProps = {},
      TabScrollButtonProps = {},
      textColor = 'primary',
      value,
      variant = 'standard',
      visibleScrollbar = false,
      hasBorder = false,
      sx,
      className,
      ...other
    } = props;
    const sxStyles = useSxProp(sx);

    const scrollable = variant === 'scrollable';
    const vertical = orientation === 'vertical';

    const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';
    const start = vertical ? 'top' : 'left';
    const end = vertical ? 'bottom' : 'right';
    const clientSize = vertical ? 'clientHeight' : 'clientWidth';
    const size = vertical ? 'height' : 'width';

    const ownerState = {
      ...props,
      component,
      allowScrollButtonsMobile,
      indicatorColor,
      orientation,
      vertical,
      scrollButtons,
      textColor,
      variant,
      visibleScrollbar,
      fixed: !scrollable,
      hideScrollbar: scrollable && !visibleScrollbar,
      scrollableX: scrollable && !vertical,
      scrollableY: scrollable && vertical,
      centered: centered && !scrollable,
      scrollButtonsHideMobile: !allowScrollButtonsMobile,
    };

    const classes = useUtilityClasses(ownerState);

    if (process.env.NODE_ENV !== 'production') {
      if (centered && scrollable) {
        console.error(
          '[Plaza-UI]: You can not use the `centered={true}` and `variant="scrollable"` properties ' +
            'at the same time on a `Tabs` component.',
        );
      }
    }

    const [mounted, setMounted] = React.useState(false);
    const [indicatorStyle, setIndicatorStyle] = React.useState(
      defaultIndicatorStyle,
    );
    const [displayScroll, setDisplayScroll] = React.useState({
      start: false,
      end: false,
    });

    const [scrollerStyle, setScrollerStyle] = React.useState<{
      overflow: string | null;
      scrollbarWidth: number;
    }>({
      overflow: 'hidden',
      scrollbarWidth: 0,
    });

    const valueToIndex = new Map();
    const tabsRef = React.useRef<HTMLElement>(null);
    const tabListRef = React.useRef<HTMLElement>(null);

    const getTabsMeta = () => {
      const tabsNode = tabsRef.current;
      let tabsMeta;
      if (tabsNode) {
        const rect = tabsNode.getBoundingClientRect();
        // create a new object with ClientRect class props + scrollLeft
        tabsMeta = {
          clientWidth: tabsNode.clientWidth,
          scrollLeft: tabsNode.scrollLeft,
          scrollTop: tabsNode.scrollTop,
          scrollLeftNormalized: getNormalizedScrollLeft(
            tabsNode,
            theme.direction,
          ),
          scrollWidth: tabsNode.scrollWidth,
          top: rect.top,
          bottom: rect.bottom,
          left: rect.left,
          right: rect.right,
        };
      }

      let tabMeta;
      if (tabsNode && value !== false) {
        const {children} = tabListRef.current as HTMLElement;

        if (children.length > 0) {
          const tab = children[valueToIndex.get(value)];
          if (process.env.NODE_ENV !== 'production') {
            if (!tab) {
              console.error(
                [
                  `[Plaza-UI]: The \`value\` provided to the Tabs component is invalid.`,
                  `None of the Tabs' children match with "${value}".`,
                  valueToIndex.keys
                    ? `You can provide one of the following values: ${Array.from(
                        valueToIndex.keys(),
                      ).join(', ')}.`
                    : null,
                ].join('\n'),
              );
            }
          }
          tabMeta = tab ? tab.getBoundingClientRect() : null;

          if (process.env.NODE_ENV !== 'production') {
            if (
              process.env.NODE_ENV !== 'test' &&
              !warnedOnceTabPresent &&
              tabMeta &&
              tabMeta.width === 0 &&
              tabMeta.height === 0
            ) {
              tabsMeta = null;
              console.error(
                [
                  '[Plaza-UI] : The `value` provided to the Tabs component is invalid.',
                  `The Tab with this \`value\` ("${value}") is not part of the document layout.`,
                  "Make sure the tab item is present in the document or that it's not `display: none`.",
                ].join('\n'),
              );

              warnedOnceTabPresent = true;
            }
          }
        }
      }
      return {tabsMeta, tabMeta};
    };

    const updateIndicatorState = useEventCallback(() => {
      const {tabsMeta, tabMeta} = getTabsMeta();
      let startValue = 0;
      let startIndicator;

      if (vertical) {
        startIndicator = 'top';
        if (tabMeta && tabsMeta) {
          startValue = tabMeta.top - tabsMeta.top + tabsMeta.scrollTop;
        }
      } else {
        startIndicator = isRtl ? 'right' : 'left';
        if (tabMeta && tabsMeta) {
          const correction = isRtl
            ? tabsMeta.scrollLeftNormalized +
              tabsMeta.clientWidth -
              tabsMeta.scrollWidth
            : tabsMeta.scrollLeft;
          startValue =
            (isRtl ? -1 : 1) *
            ((tabMeta as any)[startIndicator] -
              (tabsMeta as any)[startIndicator] +
              correction);
        }
      }

      const newIndicatorStyle = {
        [startIndicator]: startValue,
        // May be wrong until the font is loaded.
        [size]: tabMeta ? tabMeta[size] : 0,
      };

      // IE11 support, replace with Number.isNaN
      // eslint-disable-next-line no-restricted-globals
      if (
        isNaN(indicatorStyle[startIndicator]) ||
        isNaN(indicatorStyle[size])
      ) {
        setIndicatorStyle(newIndicatorStyle);
      } else {
        const dStart = Math.abs(
          indicatorStyle[startIndicator] - newIndicatorStyle[startIndicator],
        );
        const dSize = Math.abs(indicatorStyle[size] - newIndicatorStyle[size]);

        if (dStart >= 1 || dSize >= 1) {
          setIndicatorStyle(newIndicatorStyle);
        }
      }
    });

    const scroll = (scrollValue: number, {animation = true} = {}) => {
      if (animation) {
        animate(scrollStart, tabsRef.current as HTMLElement, scrollValue, {
          duration: 500,
        });
      } else {
        (tabsRef.current as HTMLElement)[scrollStart] = scrollValue;
      }
    };

    const moveTabsScroll = (delta: number) => {
      let scrollValue = (tabsRef.current as HTMLElement)[scrollStart];

      if (vertical) {
        scrollValue += delta;
      } else {
        scrollValue += delta * (isRtl ? -1 : 1);
        // Fix for Edge
        scrollValue *= isRtl && detectScrollType() === 'reverse' ? 1 : 1;
      }
      scroll(scrollValue);
    };

    const getScrollSize = () => {
      const containerSize = (tabsRef.current as HTMLElement)[clientSize];
      let totalSize = 0;
      const children = Array.from((tabListRef.current as HTMLElement).children);

      for (let i = 0; i < children.length; i += 1) {
        const tab = children[i];
        if (totalSize + tab[clientSize] > containerSize) {
          break;
        }
        totalSize += tab[clientSize];
      }
      return totalSize;
    };

    const handleStartScrollClick = () => {
      moveTabsScroll(-1 * getScrollSize());
    };

    const handleEndScrollClick = () => {
      moveTabsScroll(getScrollSize());
    };

    // TODO Remove <ScrollbarSize /> as browser support for hidding the scrollbar
    // with CSS improves.
    const handleScrollbarSizeChange = React.useCallback(scrollbarWidth => {
      setScrollerStyle({
        overflow: null,
        scrollbarWidth,
      });
    }, []);

    const getConditionalElements = () => {
      const conditionalElements: any = {};

      conditionalElements.scrollbarSizeListener = scrollable ? (
        <S.TabsScrollbarSize
          onChange={handleScrollbarSizeChange}
          className={clsx(classes.scrollableX, classes.hideScrollbar)}
        />
      ) : null;

      const scrollButtonsActive = displayScroll.start || displayScroll.end;
      const showScrollButtons =
        scrollable &&
        ((scrollButtons === 'auto' && scrollButtonsActive) ||
          scrollButtons === true);

      conditionalElements.scrollButtonStart = showScrollButtons ? (
        <ScrollButtonComponent
          orientation={orientation}
          direction={isRtl ? 'right' : 'left'}
          onClick={handleStartScrollClick}
          disabled={!displayScroll.start}
          className={clsx(
            classes.scrollButtons,
            TabScrollButtonProps.className,
          )}
          {...TabScrollButtonProps}
        />
      ) : null;

      conditionalElements.scrollButtonEnd = showScrollButtons ? (
        <ScrollButtonComponent
          orientation={orientation}
          direction={isRtl ? 'left' : 'right'}
          onClick={handleEndScrollClick}
          disabled={!displayScroll.end}
          {...TabScrollButtonProps}
        />
      ) : null;

      return conditionalElements;
    };

    const scrollSelectedIntoView = useEventCallback((animation?: boolean) => {
      const {tabsMeta, tabMeta} = getTabsMeta();

      if (!tabMeta || !tabsMeta) {
        return;
      }

      if (tabMeta[start] < tabsMeta[start]) {
        // left side of button is out of view
        const nextScrollStart =
          tabsMeta[scrollStart] + (tabMeta[start] - tabsMeta[start]);
        scroll(nextScrollStart, {animation});
      } else if (tabMeta[end] > tabsMeta[end]) {
        // right side of button is out of view
        const nextScrollStart =
          tabsMeta[scrollStart] + (tabMeta[end] - tabsMeta[end]);
        scroll(nextScrollStart, {animation});
      }
    });

    const updateScrollButtonState = useEventCallback(() => {
      if (scrollable && scrollButtons !== false) {
        const {
          scrollTop,
          scrollHeight,
          clientHeight,
          scrollWidth,
          clientWidth,
        } = tabsRef.current as HTMLElement;
        let showStartScroll;
        let showEndScroll;

        if (vertical) {
          showStartScroll = scrollTop > 1;
          showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
        } else {
          const scrollLeft = getNormalizedScrollLeft(
            tabsRef.current as HTMLElement,
            theme.direction,
          );
          // use 1 for the potential rounding error with browser zooms.
          showStartScroll = isRtl
            ? scrollLeft < scrollWidth - clientWidth - 1
            : scrollLeft > 1;
          showEndScroll = !isRtl
            ? scrollLeft < scrollWidth - clientWidth - 1
            : scrollLeft > 1;
        }

        if (
          showStartScroll !== displayScroll.start ||
          showEndScroll !== displayScroll.end
        ) {
          setDisplayScroll({start: showStartScroll, end: showEndScroll});
        }
      }
    });

    React.useEffect(() => {
      const handleResize = debounce(() => {
        updateIndicatorState();
        updateScrollButtonState();
      });
      const win = ownerWindow(tabsRef.current as HTMLElement);
      win.addEventListener('resize', handleResize);

      let resizeObserver: ResizeObserver;

      if (typeof ResizeObserver !== 'undefined') {
        resizeObserver = new ResizeObserver(handleResize);
        Array.from((tabListRef.current as HTMLElement).children).forEach(
          child => {
            resizeObserver.observe(child);
          },
        );
      }

      return () => {
        handleResize.clear();
        win.removeEventListener('resize', handleResize);
        if (resizeObserver) {
          resizeObserver.disconnect();
        }
      };
    }, [updateIndicatorState, updateScrollButtonState]);

    const handleTabsScroll = React.useMemo(
      () =>
        debounce(() => {
          updateScrollButtonState();
        }),
      [updateScrollButtonState],
    );

    React.useEffect(
      () => () => {
        handleTabsScroll.clear();
      },
      [handleTabsScroll],
    );

    React.useEffect(() => {
      setMounted(true);
    }, []);

    React.useEffect(() => {
      updateIndicatorState();
      updateScrollButtonState();
    });

    React.useEffect(() => {
      // Don't animate on the first render.
      scrollSelectedIntoView(defaultIndicatorStyle !== indicatorStyle);
    }, [scrollSelectedIntoView, indicatorStyle]);

    React.useImperativeHandle(
      action,
      () => ({
        updateIndicator: updateIndicatorState,
        updateScrollButtons: updateScrollButtonState,
      }),
      [updateIndicatorState, updateScrollButtonState],
    );

    const indicator = (
      <S.TabsIndicator
        {...TabIndicatorProps}
        $isVertical={ownerState.vertical}
        $indicatorColor={ownerState.indicatorColor}
        className={clsx(classes.indicator, TabIndicatorProps.className)}
        style={{
          ...indicatorStyle,
          ...TabIndicatorProps.style,
        }}
      />
    );

    let childIndex = 0;
    const children = React.Children.map(childrenProp, child => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const childValue =
        child.props.value === undefined ? childIndex : child.props.value;
      valueToIndex.set(childValue, childIndex);
      const selected = childValue === value;

      childIndex += 1;
      return React.cloneElement(child, {
        fullWidth: variant === 'fullWidth',
        indicator: selected && !mounted && indicator,
        selected,
        selectionFollowsFocus,
        onChange,
        textColor,
        value: childValue,
        ...(childIndex === 1 && value === false && !child.props.tabIndex
          ? {tabIndex: 0}
          : {}),
      });
    });

    const handleKeyDown = (event: React.KeyboardEvent) => {
      const list = tabListRef.current;
      const currentFocus = ownerDocument(list).activeElement;
      // Keyboard navigation assumes that [role="tab"] are siblings
      // though we might warn in the future about nested, interactive elements
      // as a a11y violation
      const role = (currentFocus as Element).getAttribute('role');
      if (role !== 'tab') {
        return;
      }

      let previousItemKey =
        orientation === 'horizontal' ? 'ArrowLeft' : 'ArrowUp';
      let nextItemKey =
        orientation === 'horizontal' ? 'ArrowRight' : 'ArrowDown';
      if (orientation === 'horizontal' && isRtl) {
        // swap previousItemKey with nextItemKey
        previousItemKey = 'ArrowRight';
        nextItemKey = 'ArrowLeft';
      }

      switch (event.key) {
        case previousItemKey:
          event.preventDefault();
          moveFocus(list, currentFocus, previousItem);
          break;
        case nextItemKey:
          event.preventDefault();
          moveFocus(list, currentFocus, nextItem);
          break;
        case 'Home':
          event.preventDefault();
          moveFocus(list, null, nextItem);
          break;
        case 'End':
          event.preventDefault();
          moveFocus(list, null, previousItem);
          break;
        default:
          break;
      }
    };

    const conditionalElements = getConditionalElements();

    return (
      <S.Tabs
        as={component}
        className={clsx(classes.root, className)}
        ref={ref as Ref<HTMLDivElement>}
        $isVertical={ownerState.vertical}
        $scrollButtonsHideMobile={ownerState.scrollButtonsHideMobile}
        $hasBorder={hasBorder}
        sx={sxStyles}
        {...other}
      >
        {conditionalElements.scrollButtonStart}
        {conditionalElements.scrollbarSizeListener}
        <S.TabsScroller
          className={classes.scroller}
          $fixed={ownerState.fixed}
          $hideScrollbar={ownerState.hideScrollbar}
          $scrollableX={ownerState.scrollableX}
          $scrollableY={ownerState.scrollableY}
          style={{
            overflow: scrollerStyle.overflow as any,
            [vertical ? `margin${isRtl ? 'Left' : 'Right'}` : 'marginBottom']:
              visibleScrollbar ? undefined : -scrollerStyle.scrollbarWidth,
          }}
          ref={tabsRef as React.RefObject<HTMLDivElement>}
          onScroll={handleTabsScroll}
        >
          {/* The tablist isn't interactive but the tabs are */}
          <S.FlexContainer
            aria-label={ariaLabel}
            aria-labelledby={ariaLabelledBy}
            className={classes.flexContainer}
            aria-orientation={
              (orientation === 'vertical' ? 'vertical' : null) as any
            }
            $isVertical={ownerState.vertical}
            $isCentered={ownerState.centered}
            onKeyDown={handleKeyDown}
            ref={tabListRef as React.RefObject<HTMLDivElement>}
            role="tablist"
          >
            {children}
          </S.FlexContainer>
          {mounted && indicator}
        </S.TabsScroller>
        {conditionalElements.scrollButtonEnd}
      </S.Tabs>
    );
  },
);
Tabs.displayName = 'Tabs';

export default Tabs;
