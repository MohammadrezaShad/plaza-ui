import * as React from 'react';

export type AccordionContextProps = {
  expanded: boolean;
  disabled: boolean;
  disableGutters: boolean;
  toggle: () => void;
};
type AccordionContextType =
  // eslint-disable-next-line @typescript-eslint/ban-types
  AccordionContextProps | {};
const AccordionContext = React.createContext<AccordionContextType>({});

if (process.env.NODE_ENV !== 'production') {
  AccordionContext.displayName = 'AccordionContext';
}

export default AccordionContext;
