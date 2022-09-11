import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface BaseDialogClasses {
  root: string;
  layout: string;
  container: string;
  open: string;
  backdrop: string;
}

export type BaseDialogClassKey = keyof BaseDialogClasses;

export function getDialogUtilityClass(slot: string): string {
  return generateUtilityClass('PuiDialog', slot);
}

const baseDialogClasses: BaseDialogClasses = generateUtilityClasses(
  'PuiDialog',
  ['root', 'layout', 'container', 'open', 'backdrop'],
);

export default baseDialogClasses;
