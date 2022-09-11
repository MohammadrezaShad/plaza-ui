// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import {useForkRef} from '@plaza-ui/hooks/lib/useForkRef';
import {useId} from '@plaza-ui/hooks/lib/useId';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import {ownerDocument} from '@plaza-ui/utils/lib/ownerDocument';
import clsx from 'clsx';
import React from 'react';
import {ThemeContext} from 'styled-components';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {Component, TransitionProps as TransitionPropsType} from '../../shared';
import Collapse from '../Collapse/Collapse';
import {DescendantProvider, useDescendant} from '../TreeView/descendants';
import TreeViewContext from '../TreeView/TreeViewContext';
import * as S from './TreeItem.styled';
import {getTreeItemUtilityClass, TreeItemClasses} from './treeItemClasses';
import TreeItemContent, {TreeItemContentProps} from './TreeItemContent';

export interface TreeItemProps
  extends Omit<React.HTMLAttributes<HTMLLIElement>, 'onFocus'> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TreeItemClasses>;
  /**
   * The icon used to collapse the node.
   */
  collapseIcon?: React.ReactNode;
  /**
   * The component used for the content node.
   * @default TreeItemContent
   */
  ContentComponent?: React.JSXElementConstructor<TreeItemContentProps>;
  /**
   * Props applied to ContentComponent
   */
  ContentProps?: React.HTMLAttributes<HTMLElement>;
  /**
   * If `true`, the node is disabled.
   */
  disabled?: boolean;
  /**
   * The icon displayed next to a end node.
   */
  endIcon?: React.ReactNode;
  /**
   * The icon used to expand the node.
   */
  expandIcon?: React.ReactNode;
  /**
   * The icon to display next to the tree node's label.
   */
  icon?: React.ReactNode;
  /**
   * This prop isn't supported.
   * Use the `onNodeFocus` callback on the tree if you need to monitor a node's focus.
   */
  onFocus?: null;
  /**
   * The tree node label.
   */
  label?: React.ReactNode;
  /**
   * The id of the node.
   */
  nodeId: string;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Collapse
   */
  TransitionComponent?: React.JSXElementConstructor<TransitionPropsType>;
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps?: TransitionPropsType;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxType;
}

const useUtilityClasses = (ownerState: Pick<TreeItemProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
    content: ['content'],
    expanded: ['expanded'],
    selected: ['selected'],
    focused: ['focused'],
    disabled: ['disabled'],
    iconContainer: ['iconContainer'],
    label: ['label'],
    group: ['group'],
  };

  return composeClasses(slots, getTreeItemUtilityClass, classes);
};

const TreeItem = React.forwardRef(
  (props: TreeItemProps, ref: React.Ref<HTMLLIElement>) => {
    const {
      children,
      className,
      collapseIcon,
      ContentComponent = TreeItemContent,
      ContentProps,
      endIcon,
      expandIcon,
      disabled: disabledProp,
      icon,
      id: idProp,
      label,
      nodeId,
      onClick,
      onMouseDown,
      TransitionComponent = Collapse,
      TransitionProps,
      ...other
    } = props;

    const {
      icons: contextIcons = {},
      focus,
      isExpanded,
      isFocused,
      isSelected,
      isDisabled,
      multiSelect,
      disabledItemsFocusable,
      mapFirstChar,
      unMapFirstChar,
      registerNode,
      unregisterNode,
      treeId,
    } = React.useContext(TreeViewContext);

    let id: string | null = null;

    if (idProp != null) {
      id = idProp;
    } else if (treeId && nodeId) {
      id = `${treeId}-${nodeId}`;
    }

    const [treeitemElement, setTreeitemElement] = React.useState(null);
    const contentRef = React.useRef(null);
    const handleRef = useForkRef(setTreeitemElement, ref);

    const descendant = React.useMemo(
      () => ({
        element: treeitemElement,
        id: nodeId,
      }),
      [nodeId, treeitemElement],
    );

    const {index, parentId} = useDescendant(descendant);

    const expandable = Boolean(
      Array.isArray(children) ? children.length : children,
    );
    const expanded = isExpanded ? isExpanded(nodeId) : false;
    const focused = isFocused ? isFocused(nodeId) : false;
    const selected = isSelected ? isSelected(nodeId) : false;
    const disabled = isDisabled ? isDisabled(nodeId) : false;

    const ownerState = {
      ...props,
      expanded,
      focused,
      selected,
      disabled,
    };

    const classes = useUtilityClasses(ownerState);

    let displayIcon;
    let expansionIcon;

    if (expandable) {
      if (!expanded) {
        expansionIcon = expandIcon || contextIcons.defaultExpandIcon;
      } else {
        expansionIcon = collapseIcon || contextIcons.defaultCollapseIcon;
      }
    }

    if (expandable) {
      displayIcon = contextIcons.defaultParentIcon;
    } else {
      displayIcon = endIcon || contextIcons.defaultEndIcon;
    }

    React.useEffect(() => {
      // On the first render a node's index will be -1. We want to wait for the real index.
      if (registerNode && unregisterNode && index !== -1) {
        registerNode({
          id: nodeId,
          idAttribute: id,
          index,
          parentId,
          expandable,
          disabled: disabledProp,
        });

        return () => {
          unregisterNode(nodeId);
        };
      }

      return undefined;
    }, [
      registerNode,
      unregisterNode,
      parentId,
      index,
      nodeId,
      expandable,
      disabledProp,
      id,
    ]);

    React.useEffect(() => {
      if (mapFirstChar && unMapFirstChar && label) {
        mapFirstChar(
          nodeId,
          (contentRef.current as any)?.textContent
            .substring(0, 1)
            .toLowerCase(),
        );

        return () => {
          unMapFirstChar(nodeId);
        };
      }
      return undefined;
    }, [mapFirstChar, unMapFirstChar, nodeId, label]);

    let ariaSelected;
    if (multiSelect) {
      ariaSelected = selected;
    } else if (selected) {
      /* single-selection trees unset aria-selected on un-selected items.
       *
       * If the tree does not support multiple selection, aria-selected
       * is set to true for the selected node and it is not present on any other node in the tree.
       * Source: https://www.w3.org/TR/wai-aria-practices/#TreeView
       */
      ariaSelected = true;
    }

    function handleFocus(event) {
      // DOM focus stays on the tree which manages focus with aria-activedescendant
      if (event.target === event.currentTarget) {
        ownerDocument(event.target)
          .getElementById(treeId)
          .focus({preventScroll: true});
      }

      const unfocusable = !disabledItemsFocusable && disabled;
      if (!focused && event.currentTarget === event.target && !unfocusable) {
        focus(event, nodeId);
      }
    }

    return (
      <S.TreeItemRoot
        className={clsx(classes.root, className)}
        role="treeitem"
        aria-expanded={expandable ? expanded : null}
        aria-selected={ariaSelected}
        aria-disabled={disabled || null}
        ref={handleRef}
        id={id}
        tabIndex={-1}
        {...other}
        ownerState={ownerState}
        // eslint-disable-next-line react/jsx-no-bind
        onFocus={handleFocus}
      >
        <S.StyledTreeItemContent
          as={ContentComponent}
          ref={contentRef}
          classes={{
            root: classes.content,
            expanded: classes.expanded,
            selected: classes.selected,
            focused: classes.focused,
            disabled: classes.disabled,
            iconContainer: classes.iconContainer,
            label: classes.label,
          }}
          label={label}
          nodeId={nodeId}
          onClick={onClick}
          onMouseDown={onMouseDown}
          icon={icon}
          expansionIcon={expansionIcon}
          displayIcon={displayIcon}
          {...ContentProps}
        />
        {children && (
          <DescendantProvider id={nodeId}>
            <S.TreeItemGroup
              as={TransitionComponent}
              unmountOnExit
              className={classes.group}
              in={expanded}
              component="ul"
              role="group"
              {...TransitionProps}
            >
              {children}
            </S.TreeItemGroup>
          </DescendantProvider>
        )}
      </S.TreeItemRoot>
    );
  },
);

TreeItem.displayName = 'TreeItem';

export default TreeItem;
