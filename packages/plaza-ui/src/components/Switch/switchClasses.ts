import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface SwitchClasses {
  root: string;
  checked: string;
  disabled: string;
  wrap: string;
  container: string;
  icon: string;
  text: string;
  layout: string;
}

export type SwitchClassKey = keyof SwitchClasses;

export function getSwitchUtilityClass(slot: string): string {
  return generateUtilityClass('PuiSwitch', slot);
}

const switchClasses: SwitchClasses = generateUtilityClasses('PuiSwitch', [
  'root',
  'checked',
  'disabled',
  'wrap',
  'container',
  'text',
  'icon',
  'layout',
]);

export default switchClasses;
