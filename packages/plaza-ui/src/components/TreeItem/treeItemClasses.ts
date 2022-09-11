import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface TreeItemClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the transition component. */
  group: string;
  /** Styles applied to the content element. */
  content: string;
  /** State class applied to the content element when expanded. */
  expanded: string;
  /** State class applied to the content element when selected. */
  selected: string;
  /** State class applied to the content element when focused. */
  focused: string;
  /** State class applied to the element when disabled. */
  disabled: string;
  /** Styles applied to the tree node icon. */
  iconContainer: string;
  /** Styles applied to the label element. */
  label: string;
}

export type TreeItemClassKey = keyof TreeItemClasses;

export function getTreeItemUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTreeItem', slot);
}

const treeItemClasses: TreeItemClasses = generateUtilityClasses('PuiTreeItem', [
  'root',
  'group',
  'content',
  'expanded',
  'selected',
  'focused',
  'disabled',
  'iconContainer',
  'label',
]);

export default treeItemClasses;
