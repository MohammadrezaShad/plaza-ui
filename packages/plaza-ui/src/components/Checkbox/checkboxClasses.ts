import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface CheckboxClasses {
  root: string;
  checked: string;
  disabled: string;
  wrap: string;
  container: string;
  icon: string;
  text: string;
  layout: string;
}

export type CheckboxClassKey = keyof CheckboxClasses;

export function getCheckboxUtilityClass(slot: string): string {
  return generateUtilityClass('PuiCheckbox', slot);
}

const checkboxClasses: CheckboxClasses = generateUtilityClasses('PuiCheckbox', [
  'root',
  'checked',
  'disabled',
  'wrap',
  'container',
  'text',
  'icon',
  'layout',
]);

export default checkboxClasses;
