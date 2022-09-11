import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface ErrorMessageClasses {
  root: string;
}

export type ErrorMessageClassKey = keyof ErrorMessageClasses;

export function getErrorMessageUtilityClass(slot: string): string {
  return generateUtilityClass('PuiErrorMessage', slot);
}

const errorMessageClasses: ErrorMessageClasses = generateUtilityClasses(
  'PuiErrorMessage',
  ['root'],
);

export default errorMessageClasses;
