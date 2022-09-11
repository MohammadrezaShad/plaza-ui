import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface LineTabClasses {
  root: string;
  content: string;
}

export type LineTabClassKey = keyof LineTabClasses;

export function getLineTabUtilityClass(slot: string): string {
  return generateUtilityClass('PuiLineTab', slot);
}

const lineTabClasses: LineTabClasses = generateUtilityClasses('PuiLineTab', [
  'root',
  'content',
]);

export default lineTabClasses;
