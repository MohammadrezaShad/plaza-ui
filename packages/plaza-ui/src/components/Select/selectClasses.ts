import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface SelectClasses {
  root: string;
}

export type SelectClassKey = keyof SelectClasses;

export function getSelectUtilityClass(slot: string): string {
  return generateUtilityClass('PuiSelect', slot);
}

const selectClasses: SelectClasses = generateUtilityClasses('PuiSelect', [
  'root',
]);

export default selectClasses;
