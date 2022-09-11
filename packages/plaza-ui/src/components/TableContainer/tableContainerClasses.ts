import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface TableContainerClasses {
  root: string;
}

export type TableContainerClassKey = keyof TableContainerClasses;

export function getTableContainerUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTableContainer', slot);
}

const tableContainerClasses: TableContainerClasses = generateUtilityClasses(
  'PuiTableContainer',
  ['root'],
);

export default tableContainerClasses;
