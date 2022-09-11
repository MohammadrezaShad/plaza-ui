import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface BackdropClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element if `invisible={true}`. */
  invisible: string;
}

export type BackdropClassKey = keyof BackdropClasses;

export function getBackdropUtilityClass(slot: string): string {
  return generateUtilityClass('PuiBackdrop', slot);
}

const backdropUnstyledClasses: BackdropClasses = generateUtilityClasses(
  'PuiBackdrop',
  ['root', 'invisible'],
);

export default backdropUnstyledClasses;
