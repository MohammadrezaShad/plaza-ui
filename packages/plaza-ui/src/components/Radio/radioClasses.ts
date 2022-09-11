import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface RadioClasses {
  root: string;
  checked: string;
  disabled: string;
  wrap: string;
  container: string;
  icon: string;
  text: string;
  layout: string;
}

export type RadioClassKey = keyof RadioClasses;

export function getRadioUtilityClass(slot: string): string {
  return generateUtilityClass('PuiRadio', slot);
}

const radioClasses: RadioClasses = generateUtilityClasses('PuiRadio', [
  'root',
  'checked',
  'disabled',
  'wrap',
  'container',
  'text',
  'icon',
  'layout',
]);

export default radioClasses;
