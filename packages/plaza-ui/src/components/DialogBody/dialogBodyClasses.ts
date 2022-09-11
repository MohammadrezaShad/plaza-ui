import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface DialogBodyClasses {
  /** Styles applied to the root element. */
  root: string;
}

export type DialogBodyClassKey = keyof DialogBodyClasses;

export function getDialogBodyUtilityClass(slot: string): string {
  return generateUtilityClass('PuiDialogBody', slot);
}

const dialogBodyClasses: DialogBodyClasses = generateUtilityClasses(
  'PuiDialogBody',
  ['root'],
);

export default dialogBodyClasses;
