import {noop} from '@plaza-ui/utils/lib/main';
import React, {Dispatch, SetStateAction} from 'react';

type TableContextProps = {
  closeDialog: () => void;
  isDialogShow?: boolean;
  setIsDialogShow?: Dispatch<SetStateAction<boolean>>;
};

export const DialogContext = React.createContext<TableContextProps>({
  closeDialog: noop,
});
DialogContext.displayName = 'DialogContext';

export function useDialogContext() {
  const context = React.useContext(DialogContext);
  if (context === undefined) {
    throw new Error(
      '[Plaza-UI] : useDialogContext must be used within a <BaseDialog />',
    );
  }
  return context;
}
