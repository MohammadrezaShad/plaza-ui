import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface LabelClasses {
  root: string;
}

export type LabelClassKey = keyof LabelClasses;

export function getLabelUtilityClass(slot: string): string {
  return generateUtilityClass('PuiLabel', slot);
}

const labelClasses: LabelClasses = generateUtilityClasses('PuiLabel', ['root']);

export default labelClasses;
