import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface TableBodyClasses {
  root: string;
}

export type TableBodyClassKey = keyof TableBodyClasses;

export function getTableBodyUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTableBody', slot);
}

const tableBodyClasses: TableBodyClasses = generateUtilityClasses(
  'PuiTableBody',
  ['root'],
);

export default tableBodyClasses;
