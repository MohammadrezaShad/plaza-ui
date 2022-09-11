import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import {useForkRef} from '@plaza-ui/hooks/lib/useForkRef';
import {useId} from '@plaza-ui/hooks/lib/useId';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import {ownerDocument} from '@plaza-ui/utils/lib/ownerDocument';
import clsx from 'clsx';
import React from 'react';
import {ThemeContext} from 'styled-components';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {DescendantProvider} from './descendants';
import * as S from './TreeView.styled';
import {getTreeViewUtilityClass, TreeViewClasses} from './treeViewClasses';
import TreeViewContext from './TreeViewContext';

export interface TreeViewPropsBase
  extends React.HTMLAttributes<HTMLUListElement> {
  /**
   * The content of the component.
   */
  children?: React.ReactNode;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TreeViewClasses>;
  /**
   * The default icon used to collapse the node.
   */
  defaultCollapseIcon?: React.ReactNode;
  /**
   * The default icon displayed next to a end node. This is applied to all
   * tree nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultEndIcon?: React.ReactNode;
  /**
   * Expanded node ids. (Uncontrolled)
   * @default []
   */
  defaultExpanded?: string[];
  /**
   * The default icon used to expand the node.
   */
  defaultExpandIcon?: React.ReactNode;
  /**
   * The default icon displayed next to a parent node. This is applied to all
   * parent nodes and can be overridden by the TreeItem `icon` prop.
   */
  defaultParentIcon?: React.ReactNode;
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable?: boolean;
  /**
   * If `true` selection is disabled.
   * @default false
   */
  disableSelection?: boolean;
  /**
   * Expanded node ids. (Controlled)
   */
  expanded?: string[];
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id?: string;
  /**
   * Callback fired when tree items are focused.
   *
   * @param {React.SyntheticEvent} event The event source of the callback **Warning**: This is a generic event not a focus event.
   * @param {string} value of the focused node.
   */
  onNodeFocus?: (event: React.SyntheticEvent, nodeId: string) => void;
  /**
   * Callback fired when tree items are expanded/collapsed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   * @param {array} nodeIds The ids of the expanded nodes.
   */
  onNodeToggle?: (event: React.SyntheticEvent, nodeIds: string[]) => void;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx?: SxType;
}

export interface MultiSelectTreeViewProps extends TreeViewPropsBase {
  /**
   * Selected node ids. (Uncontrolled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   * @default []
   */
  defaultSelected?: string[];
  /**
   * Selected node ids. (Controlled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected?: string[];
  /**
   * If true `ctrl` and `shift` will trigger multiselect.
   * @default false
   */
  multiSelect?: true;
  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {React.SyntheticEvent} event The event source of the callback
   * @param {string[] | string} nodeIds Ids of the selected nodes. When `multiSelect` is true
   * this is an array of strings; when false (default) a string.
   */
  onNodeSelect?: (event: React.SyntheticEvent, nodeIds: string[]) => void;
}

export interface SingleSelectTreeViewProps extends TreeViewPropsBase {
  /**
   * Selected node ids. (Uncontrolled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   * @default []
   */
  defaultSelected?: string;
  /**
   * Selected node ids. (Controlled)
   * When `multiSelect` is true this takes an array of strings; when false (default) a string.
   */
  selected?: string;
  /**
   * If true `ctrl` and `shift` will trigger multiselect.
   * @default false
   */
  multiSelect?: false;
  /**
   * Callback fired when tree items are selected/unselected.
   *
   * @param {React.SyntheticEvent} event The event source of the callback
   * @param {string[] | string} nodeIds Ids of the selected nodes. When `multiSelect` is true
   * this is an array of strings; when false (default) a string.
   */
  onNodeSelect?: (event: React.SyntheticEvent, nodeIds: string) => void;
}

export type TreeViewProps =
  | SingleSelectTreeViewProps
  | MultiSelectTreeViewProps;

const useUtilityClasses = (ownerState: Pick<TreeViewProps, 'classes'>) => {
  const {classes} = ownerState;

  const slots = {
    root: ['root'],
  };

  return composeClasses(slots, getTreeViewUtilityClass, classes);
};

function isPrintableCharacter(string: string) {
  return string && string.length === 1 && string.match(/\S/);
}

function findNextFirstChar(
  firstChars: string[],
  startIndex: number,
  char: string,
) {
  for (let i = startIndex; i < firstChars.length; i += 1) {
    if (char === firstChars[i]) {
      return i;
    }
  }
  return -1;
}

function noopSelection() {
  return false;
}

const defaultDefaultExpanded: number[] = [];
const defaultDefaultSelected: number[] = [];

const TreeView = React.forwardRef(
  <T extends HTMLElement = HTMLUListElement>(
    props: TreeViewProps,
    ref: React.Ref<T>,
  ) => {
    const {
      children,
      className,
      defaultCollapseIcon,
      defaultEndIcon,
      defaultExpanded = defaultDefaultExpanded,
      defaultExpandIcon,
      defaultParentIcon,
      defaultSelected = defaultDefaultSelected,
      disabledItemsFocusable = false,
      disableSelection = false,
      expanded: expandedProp,
      id: idProp,
      multiSelect = false,
      onBlur,
      onFocus,
      onKeyDown,
      onNodeFocus,
      onNodeSelect,
      onNodeToggle,
      selected: selectedProp,
      sx,
      classes: classesProp,
      ...other
    } = props;
    const sxStyles = useSxProp(sx);

    const theme = React.useContext(ThemeContext);
    const isRtl = theme.direction === 'rtl';

    const ownerState = {
      ...props,
      defaultExpanded,
      defaultSelected,
      disabledItemsFocusable,
      disableSelection,
      multiSelect,
    };

    const classes = useUtilityClasses(ownerState);

    const treeId = useId(idProp);

    const treeRef = React.useRef(null);
    const handleRef = useForkRef(treeRef, ref);

    const [focusedNodeId, setFocusedNodeId] = React.useState<string | null>(
      null,
    );

    const nodeMap = React.useRef<any>({});

    const firstCharMap = React.useRef<any>({});

    const [expanded, setExpandedState] = useControlled({
      controlled: expandedProp,
      default: defaultExpanded,
      name: 'TreeView',
      state: 'expanded',
    });

    const [selected, setSelectedState] = useControlled({
      controlled: selectedProp,
      default: defaultSelected,
      name: 'TreeView',
      state: 'selected',
    });

    /*
     * Status Helpers
     */
    const isExpanded = React.useCallback(
      id => (Array.isArray(expanded) ? expanded.indexOf(id) !== -1 : false),
      [expanded],
    );

    const isExpandable = React.useCallback(
      id => nodeMap.current[id] && nodeMap.current[id].expandable,
      [],
    );

    const isSelected = React.useCallback(
      id =>
        Array.isArray(selected) ? selected.indexOf(id) !== -1 : selected === id,
      [selected],
    );

    const isDisabled = React.useCallback(id => {
      let node = nodeMap.current[id];

      // This can be called before the node has been added to the node map.
      if (!node) {
        return false;
      }

      if (node.disabled) {
        return true;
      }

      while (node.parentId != null) {
        node = nodeMap.current[node.parentId];
        if (node.disabled) {
          return true;
        }
      }

      return false;
    }, []);

    const isFocused = (id: string) => focusedNodeId === id;

    const getChildrenIds = (id: string | null) =>
      Object.keys(nodeMap.current)
        .map(key => nodeMap.current[key])
        .filter(node => node.parentId === id)
        .sort((a, b) => a.index - b.index)
        .map(child => child.id);

    const getNavigableChildrenIds = (id: string | null) => {
      let childrenIds = getChildrenIds(id);

      if (!disabledItemsFocusable) {
        childrenIds = childrenIds.filter(node => !isDisabled(node));
      }
      return childrenIds;
    };

    /*
     * Node Helpers
     */

    const getNextNode = (id: string) => {
      // If expanded get first child
      if (isExpanded(id) && getNavigableChildrenIds(id).length > 0) {
        return getNavigableChildrenIds(id)[0];
      }

      let node = nodeMap.current[id];
      while (node != null) {
        // Try to get next sibling
        const siblings = getNavigableChildrenIds(node.parentId);
        const nextSibling = siblings[siblings.indexOf(node.id) + 1];

        if (nextSibling) {
          return nextSibling;
        }

        // If the sibling does not exist, go up a level to the parent and try again.
        node = nodeMap.current[node.parentId];
      }

      return null;
    };

    const getPreviousNode = (id: string) => {
      const node = nodeMap.current[id];
      const siblings = getNavigableChildrenIds(node.parentId);
      const nodeIndex = siblings.indexOf(id);

      if (nodeIndex === 0) {
        return node.parentId;
      }

      let currentNode = siblings[nodeIndex - 1];
      while (
        isExpanded(currentNode) &&
        getNavigableChildrenIds(currentNode).length > 0
      ) {
        currentNode = getNavigableChildrenIds(currentNode).pop();
      }

      return currentNode;
    };

    const getLastNode = () => {
      let lastNode = getNavigableChildrenIds(null).pop();

      while (isExpanded(lastNode)) {
        lastNode = getNavigableChildrenIds(lastNode).pop();
      }
      return lastNode;
    };
    const getFirstNode = () => getNavigableChildrenIds(null)[0];
    const getParent = (id: string) => nodeMap.current[id].parentId;

    const findOrderInTremauxTree = (nodeAId: number, nodeBId: number) => {
      if (nodeAId === nodeBId) {
        return [nodeAId, nodeBId];
      }

      const nodeA = nodeMap.current[nodeAId];
      const nodeB = nodeMap.current[nodeBId];

      if (nodeA.parentId === nodeB.id || nodeB.parentId === nodeA.id) {
        return nodeB.parentId === nodeA.id
          ? [nodeA.id, nodeB.id]
          : [nodeB.id, nodeA.id];
      }

      const aFamily = [nodeA.id];
      const bFamily = [nodeB.id];

      let aAncestor = nodeA.parentId;
      let bAncestor = nodeB.parentId;

      let aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
      let bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;

      let continueA = true;
      let continueB = true;

      while (!bAncestorIsCommon && !aAncestorIsCommon) {
        if (continueA) {
          aFamily.push(aAncestor);
          aAncestorIsCommon = bFamily.indexOf(aAncestor) !== -1;
          continueA = aAncestor !== null;
          if (!aAncestorIsCommon && continueA) {
            aAncestor = nodeMap.current[aAncestor].parentId;
          }
        }

        if (continueB && !aAncestorIsCommon) {
          bFamily.push(bAncestor);
          bAncestorIsCommon = aFamily.indexOf(bAncestor) !== -1;
          continueB = bAncestor !== null;
          if (!bAncestorIsCommon && continueB) {
            bAncestor = nodeMap.current[bAncestor].parentId;
          }
        }
      }

      const commonAncestor = aAncestorIsCommon ? aAncestor : bAncestor;
      const ancestorFamily = getChildrenIds(commonAncestor);

      const aSide = aFamily[aFamily.indexOf(commonAncestor) - 1];
      const bSide = bFamily[bFamily.indexOf(commonAncestor) - 1];

      return ancestorFamily.indexOf(aSide) < ancestorFamily.indexOf(bSide)
        ? [nodeAId, nodeBId]
        : [nodeBId, nodeAId];
    };

    const getNodesInRange = (nodeA: number, nodeB: number) => {
      const [first, last] = findOrderInTremauxTree(nodeA, nodeB);
      const nodes = [first];

      let current = first;

      while (current !== last) {
        current = getNextNode(current);
        nodes.push(current);
      }

      return nodes;
    };

    /*
     * Focus Helpers
     */

    const focus = (event: React.FocusEvent<HTMLUListElement>, id: string) => {
      if (id) {
        setFocusedNodeId(id);

        if (onNodeFocus) {
          onNodeFocus(event, `${id}`);
        }
      }
    };

    const focusNextNode = (
      event: React.FocusEvent<HTMLUListElement>,
      id: string,
    ) => focus(event, getNextNode(id));
    const focusPreviousNode = (
      event: React.FocusEvent<HTMLUListElement>,
      id: string,
    ) => focus(event, getPreviousNode(id));
    const focusFirstNode = (event: React.FocusEvent<HTMLUListElement>) =>
      focus(event, getFirstNode());
    const focusLastNode = (event: React.FocusEvent<HTMLUListElement>) =>
      focus(event, getLastNode());

    const focusByFirstCharacter = (
      event: React.FocusEvent<HTMLUListElement>,
      id: string,
      char: string,
    ) => {
      let start;
      let index;
      const lowercaseChar = char.toLowerCase();

      const firstCharIds: string[] = [];
      const firstChars: string[] = [];
      // This really only works since the ids are strings
      Object.keys(firstCharMap.current).forEach(nodeId => {
        const firstChar = firstCharMap.current[nodeId];
        const map = nodeMap.current[nodeId];
        const visible = map.parentId ? isExpanded(map.parentId) : true;
        const shouldBeSkipped = disabledItemsFocusable
          ? false
          : isDisabled(nodeId);

        if (visible && !shouldBeSkipped) {
          firstCharIds.push(nodeId);
          firstChars.push(firstChar);
        }
      });

      // Get start index for search based on position of currentItem
      start = firstCharIds.indexOf(`${id}`) + 1;
      if (start >= firstCharIds.length) {
        start = 0;
      }

      // Check remaining slots in the menu
      index = findNextFirstChar(firstChars, start, lowercaseChar);

      // If not found in remaining slots, check from beginning
      if (index === -1) {
        index = findNextFirstChar(firstChars, 0, lowercaseChar);
      }

      // If match was found...
      if (index > -1) {
        focus(event, firstCharIds[index]);
      }
    };

    /*
     * Expansion Helpers
     */

    const toggleExpansion = (
      event: React.KeyboardEvent,
      value = focusedNodeId,
    ) => {
      let newExpanded;

      if (expanded.indexOf(value) !== -1) {
        newExpanded = expanded.filter((id: number | null) => id !== value);
      } else {
        newExpanded = [value].concat(expanded);
      }

      if (onNodeToggle) {
        onNodeToggle(event, newExpanded);
      }

      setExpandedState(newExpanded);
    };

    const expandAllSiblings = (
      event: React.SyntheticEvent<Element, Event>,
      id: string | number,
    ) => {
      const map = nodeMap.current[id];
      const siblings = getChildrenIds(map.parentId);

      const diff = siblings.filter(
        child => isExpandable(child) && !isExpanded(child),
      );

      const newExpanded = expanded.concat(diff);

      if (diff.length > 0) {
        setExpandedState(newExpanded);

        if (onNodeToggle) {
          onNodeToggle(event, newExpanded);
        }
      }
    };

    /*
     * Selection Helpers
     */

    const lastSelectedNode = React.useRef<string>(
      null,
    ) as React.MutableRefObject<null | string>;
    const lastSelectionWasRange = React.useRef(false);
    const currentRangeSelection = React.useRef<any[]>([]);

    const handleRangeArrowSelect = (
      event: React.SyntheticEvent<Element, Event>,
      nodes: {start: any; next: any; current: any},
    ) => {
      let base = selected.slice();
      const {start, next, current} = nodes;

      if (!next || !current) {
        return;
      }

      if (currentRangeSelection.current.indexOf(current) === -1) {
        currentRangeSelection.current = [];
      }

      if (lastSelectionWasRange.current) {
        if (currentRangeSelection.current.indexOf(next) !== -1) {
          base = base.filter((id: any) => id === start || id !== current);
          currentRangeSelection.current = currentRangeSelection.current.filter(
            id => id === start || id !== current,
          );
        } else {
          base.push(next);
          currentRangeSelection.current.push(next);
        }
      } else {
        base.push(next);
        currentRangeSelection.current.push(current, next);
      }

      if (onNodeSelect) {
        onNodeSelect(event, base);
      }

      setSelectedState(base);
    };

    const handleRangeSelect = (
      event: React.SyntheticEvent<Element, Event>,
      nodes: {start: any; end: any},
    ) => {
      let base = selected.slice();
      const {start, end} = nodes;
      // If last selection was a range selection ignore nodes that were selected.
      if (lastSelectionWasRange.current) {
        base = base.filter(
          (id: any) => currentRangeSelection.current.indexOf(id) === -1,
        );
      }

      let range = getNodesInRange(start, end);
      range = range.filter(node => !isDisabled(node));
      currentRangeSelection.current = range;
      let newSelected = base.concat(range);
      newSelected = newSelected.filter(
        (id: any, i: any) => newSelected.indexOf(id) === i,
      );

      if (onNodeSelect) {
        onNodeSelect(event, newSelected);
      }

      setSelectedState(newSelected);
    };

    const handleMultipleSelect = (
      event: React.SyntheticEvent<Element, Event>,
      value: any,
    ) => {
      let newSelected;
      if (selected.indexOf(value) !== -1) {
        newSelected = selected.filter((id: any) => id !== value);
      } else {
        newSelected = [value].concat(selected);
      }

      if (onNodeSelect) {
        onNodeSelect(event, newSelected);
      }

      setSelectedState(newSelected);
    };

    const handleSingleSelect = (
      event: React.SyntheticEvent<Element, Event>,
      value: any,
    ) => {
      const newSelected = multiSelect ? [value] : value;

      if (onNodeSelect) {
        onNodeSelect(event, newSelected);
      }

      setSelectedState(newSelected);
    };

    const selectNode = (
      event: React.SyntheticEvent<Element, Event>,
      id: null | string,
      multiple = false,
    ) => {
      if (id) {
        if (multiple) {
          handleMultipleSelect(event, id);
        } else {
          handleSingleSelect(event, id);
        }
        lastSelectedNode.current = id;
        lastSelectionWasRange.current = false;
        currentRangeSelection.current = [];

        return true;
      }
      return false;
    };

    const selectRange = (
      event: React.SyntheticEvent<Element, Event>,
      nodes: {start?: any; end: any; current?: any},
      stacked = false,
    ) => {
      const {start = lastSelectedNode.current, end, current} = nodes;
      if (stacked) {
        handleRangeArrowSelect(event, {start, next: end, current});
      } else if (start != null && end != null) {
        handleRangeSelect(event, {start, end});
      }
      lastSelectionWasRange.current = true;
    };

    const rangeSelectToFirst = (event: any, id: string | null) => {
      if (!lastSelectedNode.current) {
        lastSelectedNode.current = id;
      }

      const start = lastSelectionWasRange.current
        ? lastSelectedNode.current
        : id;

      selectRange(event, {
        start,
        end: getFirstNode(),
      });
    };

    const rangeSelectToLast = (event: any, id: string | null) => {
      if (!lastSelectedNode.current) {
        lastSelectedNode.current = id;
      }

      const start = lastSelectionWasRange.current
        ? lastSelectedNode.current
        : id;

      selectRange(event, {
        start,
        end: getLastNode(),
      });
    };

    const selectNextNode = (event: any, id: string) => {
      if (!isDisabled(getNextNode(id))) {
        selectRange(
          event,
          {
            end: getNextNode(id),
            current: id,
          },
          true,
        );
      }
    };

    const selectPreviousNode = (event: any, id: string) => {
      if (!isDisabled(getPreviousNode(id))) {
        selectRange(
          event,
          {
            end: getPreviousNode(id),
            current: id,
          },
          true,
        );
      }
    };

    const selectAllNodes = (event: any) => {
      selectRange(event, {start: getFirstNode(), end: getLastNode()});
    };

    const registerNode = React.useCallback(node => {
      const {id, index, parentId, expandable, idAttribute, disabled} = node;

      nodeMap.current[id] = {
        id,
        index,
        parentId,
        expandable,
        idAttribute,
        disabled,
      };
    }, []);

    const unregisterNode = React.useCallback(id => {
      const newMap = {...nodeMap.current};
      delete newMap[id];
      nodeMap.current = newMap;

      setFocusedNodeId(oldFocusedNodeId => {
        if (
          oldFocusedNodeId === id &&
          treeRef.current === ownerDocument(treeRef.current).activeElement
        ) {
          return getChildrenIds(null)[0];
        }
        return oldFocusedNodeId;
      });
    }, []);

    const mapFirstChar = React.useCallback((id, firstChar) => {
      firstCharMap.current[id] = firstChar;
    }, []);

    const unMapFirstChar = React.useCallback(id => {
      const newMap = {...firstCharMap.current};
      delete newMap[id];
      firstCharMap.current = newMap;
    }, []);

    const handleNextArrow = (event: React.KeyboardEvent) => {
      if (isExpandable(focusedNodeId)) {
        if (isExpanded(focusedNodeId)) {
          focusNextNode(event as any, focusedNodeId as string);
        } else if (!isDisabled(focusedNodeId)) {
          toggleExpansion(event);
        }
      }
      return true;
    };

    const handlePreviousArrow = (event: React.KeyboardEvent) => {
      if (isExpanded(focusedNodeId) && !isDisabled(focusedNodeId)) {
        toggleExpansion(event, focusedNodeId);
        return true;
      }

      const parent = getParent(focusedNodeId as string);
      if (parent) {
        focus(event as any, parent);
        return true;
      }
      return false;
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
      let flag = false;
      const {key} = event;

      // If the tree is empty there will be no focused node
      if (
        event.altKey ||
        event.currentTarget !== event.target ||
        !focusedNodeId
      ) {
        return;
      }

      const ctrlPressed = event.ctrlKey || event.metaKey;
      switch (key) {
        case ' ':
          if (!disableSelection && !isDisabled(focusedNodeId)) {
            if (multiSelect && event.shiftKey) {
              selectRange(event, {end: focusedNodeId});
              flag = true;
            } else if (multiSelect) {
              flag = selectNode(event, focusedNodeId, true);
            } else {
              flag = selectNode(event, focusedNodeId);
            }
          }
          event.stopPropagation();
          break;
        case 'Enter':
          if (!isDisabled(focusedNodeId)) {
            if (isExpandable(focusedNodeId)) {
              toggleExpansion(event);
              flag = true;
            } else if (multiSelect) {
              flag = selectNode(event, focusedNodeId, true);
            } else {
              flag = selectNode(event, focusedNodeId);
            }
          }
          event.stopPropagation();
          break;
        case 'ArrowDown':
          if (multiSelect && event.shiftKey && !disableSelection) {
            selectNextNode(event, focusedNodeId);
          }
          focusNextNode(event as any, focusedNodeId);
          flag = true;
          break;
        case 'ArrowUp':
          if (multiSelect && event.shiftKey && !disableSelection) {
            selectPreviousNode(event, focusedNodeId);
          }
          focusPreviousNode(event as any, focusedNodeId);
          flag = true;
          break;
        case 'ArrowRight':
          if (isRtl) {
            flag = handlePreviousArrow(event);
          } else {
            flag = handleNextArrow(event);
          }
          break;
        case 'ArrowLeft':
          if (isRtl) {
            flag = handleNextArrow(event);
          } else {
            flag = handlePreviousArrow(event);
          }
          break;
        case 'Home':
          if (
            multiSelect &&
            ctrlPressed &&
            event.shiftKey &&
            !disableSelection &&
            !isDisabled(focusedNodeId)
          ) {
            rangeSelectToFirst(event, focusedNodeId);
          }
          focusFirstNode(event as any);
          flag = true;
          break;
        case 'End':
          if (
            multiSelect &&
            ctrlPressed &&
            event.shiftKey &&
            !disableSelection &&
            !isDisabled(focusedNodeId)
          ) {
            rangeSelectToLast(event, focusedNodeId as string);
          }
          focusLastNode(event as any);
          flag = true;
          break;
        default:
          if (key === '*') {
            expandAllSiblings(event, focusedNodeId);
            flag = true;
          } else if (
            multiSelect &&
            ctrlPressed &&
            key.toLowerCase() === 'a' &&
            !disableSelection
          ) {
            selectAllNodes(event);
            flag = true;
          } else if (
            !ctrlPressed &&
            !event.shiftKey &&
            isPrintableCharacter(key)
          ) {
            focusByFirstCharacter(event as any, focusedNodeId, key);
            flag = true;
          }
      }

      if (flag) {
        event.preventDefault();
        event.stopPropagation();
      }

      if (onKeyDown) {
        onKeyDown(event as React.KeyboardEvent<HTMLUListElement>);
      }
    };

    const handleFocus = (event: React.FocusEvent<HTMLUListElement>) => {
      // if the event bubbled (which is React specific) we don't want to steal focus
      if (event.target === event.currentTarget) {
        const firstSelected = Array.isArray(selected) ? selected[0] : selected;
        focus(event, firstSelected || getNavigableChildrenIds(null)[0]);
      }

      if (onFocus) {
        onFocus(
          event as unknown as React.FocusEvent<HTMLUListElement, Element>,
        );
      }
    };

    const handleBlur = (event: React.FocusEvent<HTMLUListElement, Element>) => {
      setFocusedNodeId(null);

      if (onBlur) {
        onBlur(event);
      }
    };

    const activeDescendant = nodeMap.current[focusedNodeId as string]
      ? nodeMap.current[focusedNodeId as string].idAttribute
      : null;

    return (
      <TreeViewContext.Provider
        value={{
          icons: {
            defaultCollapseIcon,
            defaultExpandIcon,
            defaultParentIcon,
            defaultEndIcon,
          },
          focus,
          toggleExpansion,
          isExpanded,
          isExpandable,
          isFocused,
          isSelected,
          isDisabled,
          selectNode: disableSelection ? noopSelection : selectNode,
          selectRange: disableSelection ? noopSelection : selectRange,
          multiSelect,
          disabledItemsFocusable,
          mapFirstChar,
          unMapFirstChar,
          registerNode,
          unregisterNode,
          treeId,
        }}
      >
        <DescendantProvider id={null}>
          <S.TreeViewRoot
            role="tree"
            id={treeId}
            aria-activedescendant={activeDescendant}
            aria-multiselectable={multiSelect}
            className={clsx(classes.root, className)}
            ref={handleRef as React.Ref<HTMLUListElement>}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...other}
          >
            {children}
          </S.TreeViewRoot>
        </DescendantProvider>
      </TreeViewContext.Provider>
    );
  },
);
TreeView.displayName = 'TreeView';

export default TreeView;
