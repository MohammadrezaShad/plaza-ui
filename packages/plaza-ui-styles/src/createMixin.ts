/* eslint-disable @typescript-eslint/no-explicit-any */
import {SimpleInterpolation} from 'styled-components';

import {PxToRem} from './createTypography';

export interface Mixins {
  useDisableUserSelect: () => SimpleInterpolation;
  useIconWrapper: (size?: number) => SimpleInterpolation;
}

export interface MixinsInputs extends Partial<Mixins> {
  [P: string]: any;
}

export interface MixinOptions {
  pxToRem: PxToRem;
}

const createMixins = (mixins: MixinsInputs, options: MixinOptions) => {
  const {pxToRem} = options;

  return {
    useDisableUserSelect: () => ({
      WebkitUserSelect: 'none',
      MozUserSelect: 'none',
      MsUserSelect: 'none',
      KhtmlUserSelect: 'none',
      userSelect: 'none',
      WebkitTouchCallout: 'none',
      MsTouchAction: 'pan-y',
      touchAction: 'pan-y',
      WebkitTapHighlightColor: 'transparent',
    }),
    useIconWrapper: (size: number) => {
      const sizing =
        size != null
          ? {
              width: pxToRem(size),
              height: pxToRem(size),
              minWidth: pxToRem(size),
              minHeight: pxToRem(size),
              fontSize: pxToRem(size),
            }
          : {};

      return {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...sizing,
      };
    },
    ...mixins,
  };
};

export default createMixins;
