import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface BoxClasses {
  root: string;
}

export type BoxClassKey = keyof BoxClasses;

export function getBoxUtilityClass(slot: string): string {
  return generateUtilityClass('PuiBox', slot);
}

const boxClasses: BoxClasses = generateUtilityClasses('PuiBox', ['root']);

export default boxClasses;
