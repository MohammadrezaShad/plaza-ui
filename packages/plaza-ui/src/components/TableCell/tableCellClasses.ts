import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface TableCellClasses {
  root: string;
}

export type TableCellClassKey = keyof TableCellClasses;

export function getTableCellUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTableCell', slot);
}

const tableCellClasses: TableCellClasses = generateUtilityClasses(
  'PuiTableCell',
  ['root'],
);

export default tableCellClasses;
