import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface TableHeadClasses {
  root: string;
}

export type TableHeadClassKey = keyof TableHeadClasses;

export function getTableHeadUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTableHead', slot);
}

const tableHeadClasses: TableHeadClasses = generateUtilityClasses(
  'PuiTableHead',
  ['root'],
);

export default tableHeadClasses;
