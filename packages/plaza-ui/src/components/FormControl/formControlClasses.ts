import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface FormControlClasses {
  root: string;
}

export type FormControlClassKey = keyof FormControlClasses;

export function getFormControlUtilityClass(slot: string): string {
  return generateUtilityClass('PuiFormControl', slot);
}

const formControlClasses: FormControlClasses = generateUtilityClasses(
  'PuiFormControl',
  ['root'],
);

export default formControlClasses;
