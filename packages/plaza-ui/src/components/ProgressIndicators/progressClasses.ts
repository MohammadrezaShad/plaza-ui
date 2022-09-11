import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface ProgressClasses {
  root: string;
  wrap: string;
  track: string;
  icon: string;
  label: string;
}

export type ProgressClassKey = keyof ProgressClasses;

export function getProgressUtilityClass(slot: string): string {
  return generateUtilityClass('PuiProgress', slot);
}

const progressClasses: ProgressClasses = generateUtilityClasses('PuiProgress', [
  'root',
  'wrap',
  'track',
  'label',
  'icon',
]);

export default progressClasses;
