import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';
import clsx from 'clsx';

export interface TableClasses {
  root: string;
}

export type TableClassKey = keyof TableClasses;

export function getTableUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTable', slot);
}

const tableClasses: TableClasses = generateUtilityClasses('PuiTable', ['root']);

export default tableClasses;
