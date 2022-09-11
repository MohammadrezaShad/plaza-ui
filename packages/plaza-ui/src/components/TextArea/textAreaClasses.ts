import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface TextAreaClasses {
  root: string;
  disabled: string;
  icon: string;
  helper: string;
  tag: string;
  wrap: string;
  label: string;
  head: string;
}

export type AccordionSummaryClassKey = keyof TextAreaClasses;

export function getTextAreaUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTextArea', slot);
}

const textAreaClasses: TextAreaClasses = generateUtilityClasses('PuiTextArea', [
  'root',
  'disabled',
  'wrap',
  'icon',
  'label',
  'tag',
  'helper',
  'head',
]);

export default textAreaClasses;
