import Color from 'color';

import {PxToRem} from './createTypography';

const defaultShadowVariant = {
  100: {
    xPos: 0,
    yPos: 1,
    blur: 3,
  },
  200: {
    xPos: 0,
    yPos: 3,
    blur: 6,
  },
  300: {
    xPos: 0,
    yPos: 6,
    blur: 12,
  },
  400: {
    xPos: 0,
    yPos: 12,
    blur: 24,
  },
  500: {
    xPos: 0,
    yPos: 24,
    blur: 48,
  },
};

const lowOpacityShadows = {
  variants: defaultShadowVariant,
  opacity: 0.04,
};

const mediumOpacityShadows = {
  variants: defaultShadowVariant,
  opacity: 0.08,
};

const highOpacityShadows = {
  variants: defaultShadowVariant,
  opacity: 0.16,
};

export type ShadowInputs = {
  lowOpacity?: ShadowType;
  mediumOpacity?: ShadowType;
  highOpacity?: ShadowType;
  pxToRem: PxToRem;
  color: Color | string;
};

export type ShadowArgs = {
  xPos: number;
  yPos: number;
  blur: number;
  opacity: number;
  color: Color | string;
};

export type CreateShadowArgs = {
  xPos: string;
  yPos: string;
  blur: string;
  color: Color | string;
};

export type CreateShadowInputsArgs = Omit<ShadowArgs, 'color'>;

export type ShadowVariantInput = {
  xPos: number;
  yPos: number;
  blur: number;
};

export type ShadowVariant = {
  100: ShadowVariantInput;
  200: ShadowVariantInput;
  300: ShadowVariantInput;
  400: ShadowVariantInput;
  500: ShadowVariantInput;
};

type ShadowVariantKeys = keyof ShadowVariant;

export type ShadowVariantOutput = {[key in ShadowVariantKeys]: string};

export type ShadowType = {
  variants: ShadowVariant;
  opacity: number;
};

export type Shadows = {
  lowOpacity: ShadowVariantOutput;
  mediumOpacity: ShadowVariantOutput;
  highOpacity: ShadowVariantOutput;
};

const createShadow = ({xPos, yPos, blur, color}: CreateShadowArgs) =>
  `${xPos} ${yPos} ${blur} ${color}`;

const createShadows = (shadowInputs: ShadowInputs): Shadows => {
  const {
    pxToRem,
    lowOpacity = lowOpacityShadows,
    mediumOpacity = mediumOpacityShadows,
    highOpacity = highOpacityShadows,
    color,
  } = shadowInputs;

  const createShadowInputs = (shadowInput: CreateShadowInputsArgs) => {
    const {xPos, yPos, blur, opacity} = {...shadowInput};
    const opacityColor = Color(color)
      .alpha(+opacity)
      .rgb()
      .string();
    return {
      xPos: pxToRem(+xPos),
      yPos: pxToRem(+yPos),
      blur: pxToRem(+blur),
      color: opacityColor,
    };
  };

  const createShadowOutput = (shadowType: ShadowType) => {
    const {variants, opacity} = shadowType;
    const entries = Object.entries(variants);
    const shadowsVariants: ShadowVariantOutput = {} as ShadowVariantOutput;
    entries.map(([key, value]) => {
      const inputs = createShadowInputs({...value, opacity});
      shadowsVariants[key as unknown as ShadowVariantKeys] =
        createShadow(inputs);
      return '';
    });
    return shadowsVariants;
  };
  const convertedLowOpacity = createShadowOutput(lowOpacity);
  const convertedMediumOpacity = createShadowOutput(mediumOpacity);
  const convertedHighOpacity = createShadowOutput(highOpacity);

  return {
    lowOpacity: convertedLowOpacity,
    mediumOpacity: convertedMediumOpacity,
    highOpacity: convertedHighOpacity,
  };
};

export default createShadows;
