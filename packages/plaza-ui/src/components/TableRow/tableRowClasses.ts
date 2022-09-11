import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface TableRowClasses {
  root: string;
}

export type TableRowClassKey = keyof TableRowClasses;

export function getTableRowUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTableRow', slot);
}

const tableRowClasses: TableRowClasses = generateUtilityClasses('PuiTableRow', [
  'root',
]);

export default tableRowClasses;
