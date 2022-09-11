import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface TabPanelClasses {
  root: string;
}

export type TabPanelClassKey = keyof TabPanelClasses;

export function getTabPanelUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTabPanel', slot);
}

const tabPanelClasses: TabPanelClasses = generateUtilityClasses('PuiTabPanel', [
  'root',
]);

export default tabPanelClasses;
