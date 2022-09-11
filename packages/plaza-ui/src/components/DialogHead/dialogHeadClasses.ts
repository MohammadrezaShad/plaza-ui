import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface DialogHeadClasses {
  root: string;
}

export type DialogHeadClassKey = keyof DialogHeadClasses;

export function getDialogHeadUtilityClass(slot: string): string {
  return generateUtilityClass('PuiDialogHead', slot);
}

const dialogHeadClasses: DialogHeadClasses = generateUtilityClasses(
  'PuiDialogHead',
  ['root'],
);

export default dialogHeadClasses;
