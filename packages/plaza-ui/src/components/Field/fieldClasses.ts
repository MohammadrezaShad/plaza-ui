import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface FieldClasses {
  root: string;
  disabled: string;
  icon: string;
  helper: string;
  tag: string;
  wrap: string;
  label: string;
  head: string;
}

export type AccordionSummaryClassKey = keyof FieldClasses;

export function getFieldUtilityClass(slot: string): string {
  return generateUtilityClass('PuiField', slot);
}

const fieldClasses: FieldClasses = generateUtilityClasses('PuiField', [
  'root',
  'disabled',
  'wrap',
  'icon',
  'label',
  'tag',
  'helper',
  'head',
]);

export default fieldClasses;
