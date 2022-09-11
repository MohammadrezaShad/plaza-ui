/* eslint-disable @typescript-eslint/no-explicit-any */
export type ZIndexes = {
  sticky: number;
  header: number;
  drawer: number;
  backdrop: number;
  modal: number;
  popover: number;
};

export interface ZIndexesInputs extends Partial<ZIndexes> {
  [P: string]: any;
}

const createZIndexes = (zIndexes: ZIndexesInputs = {}) => {
  const {
    sticky = 1000,
    header = 1010,
    drawer = 1020,
    backdrop = 1030,
    modal = 1040,
    popover = 1050,
    ...others
  } = zIndexes;

  return {
    sticky,
    header,
    drawer,
    backdrop,
    popover,
    modal,
    ...others,
  };
};
export default createZIndexes;
