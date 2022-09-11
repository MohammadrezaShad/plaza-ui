import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface RatingClasses {
  root: string;
  readOnly: string;
  disabled: string;
  label: string;
  icon: string;
  iconEmpty: string;
  iconFilled: string;
}

export type RatingClassKey = keyof RatingClasses;

export function getRatingUtilityClass(slot: string): string {
  return generateUtilityClass('PuiRating', slot);
}

const ratingClasses: RatingClasses = generateUtilityClasses('PuiRating', [
  'root',
  'readOnly',
  'disabled',
  'label',
  'icon',
  'iconEmpty',
  'iconFilled',
]);

export default ratingClasses;
