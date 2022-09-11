import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface IconClasses {
  root: string;
}

export type IconClassKey = keyof IconClasses;

export function getIconUtilityClass(slot: string): string {
  return generateUtilityClass('PuiIcon', slot);
}

const iconClasses: IconClasses = generateUtilityClasses('PuiIcon', ['root']);

export default iconClasses;
