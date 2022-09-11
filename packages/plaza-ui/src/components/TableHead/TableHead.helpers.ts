import React from 'react';

type TableHeadContextProps = {
  isHead?: boolean;
};

export const TableHeadContext = React.createContext<TableHeadContextProps>({});
TableHeadContext.displayName = 'TableHeadContext';

export function useTableHeadContext() {
  const context = React.useContext(TableHeadContext);
  return context;
}
