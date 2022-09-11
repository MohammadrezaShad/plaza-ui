import clsx from 'clsx';
import * as React from 'react';

import useTreeItem from './useTreeItem';

export interface TreeItemContentProps
  extends React.HTMLAttributes<HTMLElement> {
  /**
   * className applied to the root element.
   */
  className?: string;
  /**
   * Override or extend the styles applied to the component.
   */
  classes: {
    /** Styles applied to the root element. */
    root: string;
    /** State class applied to the content element when expanded. */
    expanded: string;
    /** State class applied to the content element when selected. */
    selected: string;
    /** State class applied to the content element when focused. */
    focused: string;
    /** State class applied to the element when disabled. */
    disabled: string;
    /** Styles applied to the tree node icon and collapse/expand icon. */
    iconContainer: string;
    /** Styles applied to the label element. */
    label: string;
  };
  /**
   * The tree node label.
   */
  label?: React.ReactNode;
  /**
   * The id of the node.
   */
  nodeId: string;
  /**
   * The icon to display next to the tree node's label.
   */
  icon?: React.ReactNode;
  /**
   * The icon to display next to the tree node's label. Either an expansion or collapse icon.
   */
  expansionIcon?: React.ReactNode;
  /**
   * The icon to display next to the tree node's label. Either a parent or end icon.
   */
  displayIcon?: React.ReactNode;
}
const TreeItemContent = React.forwardRef(
  (props: TreeItemContentProps, ref: React.Ref<HTMLDivElement>) => {
    const {
      classes,
      className,
      displayIcon,
      expansionIcon,
      icon: iconProp,
      label,
      nodeId,
      onClick,
      onMouseDown,
      ...other
    } = props;

    const {
      disabled,
      expanded,
      selected,
      focused,
      handleExpansion,
      handleSelection,
      preventSelection,
    } = useTreeItem(nodeId);

    const icon = iconProp || expansionIcon || displayIcon;

    const handleMouseDown = (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => {
      preventSelection(event);

      if (onMouseDown) {
        onMouseDown(event);
      }
    };

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      handleExpansion(event);
      handleSelection(event);

      if (onClick) {
        onClick(event);
      }
    };

    return (
      /* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions -- Key event is handled by the TreeView */
      <div
        className={clsx(className, classes.root, {
          [classes.expanded]: expanded,
          [classes.selected]: selected,
          [classes.focused]: focused,
          [classes.disabled]: disabled,
        })}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        ref={ref}
        {...other}
      >
        <div className={classes.iconContainer}>{icon}</div>
        <div className={classes.label}>{label}</div>
      </div>
    );
  },
);

export default TreeItemContent;

TreeItemContent.displayName = 'TreeItemContent';
