import {PxToRem} from './createTypography';

export type RadiusInput = {
  small?: number;
  medium?: number;
  large?: number;
  xlarge?: number;
  pxToRem: PxToRem;
};
export type Radius = {
  small: string;
  medium: string;
  large: string;
  xlarge: string;
};

const createRadiuses = (radiusInput: RadiusInput): Radius => {
  const {pxToRem, small = 4, medium = 8, large = 16, xlarge = 24} = radiusInput;
  return {
    small: pxToRem(small),
    medium: pxToRem(medium),
    large: pxToRem(large),
    xlarge: pxToRem(xlarge),
  };
};

export default createRadiuses;
