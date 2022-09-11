import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface SkeletonClasses {
  root: string;
}

export type SkeletonClassKey = keyof SkeletonClasses;

export function getSkeletonUtilityClass(slot: string): string {
  return generateUtilityClass('PuiSkeleton', slot);
}

const skeletonClasses: SkeletonClasses = generateUtilityClasses('PuiSkeleton', [
  'root',
]);

export default skeletonClasses;
