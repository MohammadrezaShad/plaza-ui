import React from 'react';

import {TableProps} from './Table';

type TableContextProps = Required<
  Pick<TableProps, 'padding' | 'size' | 'stickyHeader'>
>;

export const TableContext = React.createContext<TableContextProps>({
  padding: 'normal',
  size: 'medium',
  stickyHeader: false,
});
TableContext.displayName = 'TableContext';

export function useTableContext() {
  const context = React.useContext(TableContext);
  if (context === undefined) {
    throw new Error(
      '[Plaza-UI] : useTableContext must be used within a <Table />',
    );
  }
  return context;
}
