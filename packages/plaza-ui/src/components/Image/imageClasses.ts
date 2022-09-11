import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface ImageClasses {
  root: string;
  wrap: string;
}

export type ImageClassKey = keyof ImageClasses;

export function getImageUtilityClass(slot: string): string {
  return generateUtilityClass('PuiImage', slot);
}

const imageClasses: ImageClasses = generateUtilityClasses('PuiImage', [
  'root',
  'wrap',
]);

export default imageClasses;
