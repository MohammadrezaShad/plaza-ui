/* eslint-disable @typescript-eslint/no-shadow */
import deepMerge from '@plaza-ui/utils/lib/deepMerge';
import Color from 'color';

import {
  calculateContrastRatio,
  changeAlpha,
  ColorInputType,
  darken,
  lighten,
  shade,
  tint,
} from './colorUtils';

interface IColorVariant {
  origin: string;
  light: string;
  dark: string;
}

export type TextVariantUnion = 'primary' | 'secondary' | 'invert' | 'price';

type TextVariant = {
  [key in TextVariantUnion]: string;
};

export type DefaultColor =
  | 'primary'
  | 'secondary'
  | 'surface'
  | 'success'
  | 'danger'
  | 'info'
  | 'warning'
  | 'background'
  | 'backgroundVariant'
  | 'backgroundVariant2'
  | 'stroke'
  | 'strokeVariant'
  | 'textPrimary'
  | 'textSecondary'
  | 'textPrice'
  | 'textInvert';

export type MainColor =
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'success'
  | 'warning'
  | 'info'
  | 'surface';
export interface IColors {
  primary: IColorVariant;
  secondary: IColorVariant;
  surface: IColorVariant;
  success: IColorVariant;
  danger: IColorVariant;
  info: IColorVariant;
  warning: IColorVariant;
  background: IColorVariant;
  backgroundVariant: IColorVariant;
  backgroundVariant2: IColorVariant;
  stroke: IColorVariant;
  strokeVariant: IColorVariant;
  text: TextVariant;
  transparent: string;
  contrastThreshold: number;
  white: string;
  black: string;
  getContrastColorOf: (background: ColorInputType) => string;
  lighten: (color: ColorInputType, tonalOffset: number) => string;
  darken: (color: ColorInputType, tonalOffset: number) => string;
  tint: (color: ColorInputType, amount: number) => string;
  shade: (color: ColorInputType, amount: number) => string;
  changeAlpha: (color: ColorInputType, alpha: number) => string;
}

export type ColorsInputs = {
  primary?: Partial<IColorVariant>;
  secondary?: Partial<IColorVariant>;
  surface?: Partial<IColorVariant>;
  success?: Partial<IColorVariant>;
  danger?: Partial<IColorVariant>;
  info?: Partial<IColorVariant>;
  warning?: Partial<IColorVariant>;
  background?: Partial<IColorVariant>;
  backgroundVariant?: Partial<IColorVariant>;
  backgroundVariant2?: Partial<IColorVariant>;
  stroke?: Partial<IColorVariant>;
  strokeVariant?: Partial<IColorVariant>;
  contrastThreshold?: number;
  text?: TextVariant;
};

const contrastThreshold = 4.5;

const white = '#ffffff';
const black = '#000000';

const colors = {
  primary: '#FC575E',
  secondary: '#607D8B',
  surface: '#ffffff',
  success: '#4CAF50',
  danger: '#DC3545',
  info: '#2196F3',
  warning: '#FFC107',
  background: '#F7F7F7',
  backgroundVariant: '#EEEEEE',
  backgroundVariant2: '#F5F5F5',
  stroke: '#D6D6D6',
  strokeVariant: '#E7E7E7',
};

export const createLightVariant = (originColor: ColorInputType) =>
  tint(originColor, 0.2);

export const createDarkVariant = (originColor: ColorInputType) =>
  shade(originColor, 0.2);

const defaultSystemColors = {
  primary: {
    light: createLightVariant(colors.primary),
    origin: colors.primary,
    dark: createDarkVariant(colors.primary),
  },
  secondary: {
    light: createLightVariant(colors.secondary),
    origin: colors.secondary,
    dark: createDarkVariant(colors.secondary),
  },
  surface: {
    light: createLightVariant(colors.surface),
    origin: colors.surface,
    dark: createDarkVariant(colors.surface),
  },
  success: {
    light: createLightVariant(colors.success),
    origin: colors.success,
    dark: createDarkVariant(colors.success),
  },
  danger: {
    light: createLightVariant(colors.danger),
    origin: colors.danger,
    dark: createDarkVariant(colors.danger),
  },
  info: {
    light: createLightVariant(colors.info),
    origin: colors.info,
    dark: createDarkVariant(colors.info),
  },
  warning: {
    light: createLightVariant(colors.warning),
    origin: colors.warning,
    dark: createDarkVariant(colors.warning),
  },
  background: {
    light: createLightVariant(colors.background),
    origin: colors.background,
    dark: createDarkVariant(colors.background),
  },
  backgroundVariant: {
    light: createLightVariant(colors.backgroundVariant),
    origin: colors.backgroundVariant,
    dark: createDarkVariant(colors.backgroundVariant),
  },
  backgroundVariant2: {
    light: createLightVariant(colors.backgroundVariant2),
    origin: colors.backgroundVariant2,
    dark: createDarkVariant(colors.backgroundVariant2),
  },
  stroke: {
    light: createLightVariant(colors.stroke),
    origin: colors.stroke,
    dark: createDarkVariant(colors.stroke),
  },
  strokeVariant: {
    light: createLightVariant(colors.strokeVariant),
    origin: colors.strokeVariant,
    dark: createDarkVariant(colors.strokeVariant),
  },
  text: {
    primary: '#2B2B2B',
    secondary: '#555555',
    invert: '#FFFFFF',
    price: '#26373B',
  },
};

export const completeSystemColor = (
  variantInput: Partial<IColorVariant> | string,
) => {
  const pairing = {origin: '', light: '', dark: ''};

  if (typeof variantInput === 'string') {
    pairing.origin = variantInput;
    pairing.light = createLightVariant(variantInput);
    pairing.dark = createDarkVariant(variantInput);
  } else if (typeof variantInput === 'object') {
    const {origin, light, dark} = variantInput;

    if (
      (origin && dark && !light) ||
      (origin && light && !dark) ||
      (!origin && dark) ||
      (!origin && light)
    ) {
      throw new Error(
        '[Plaza-UI] : `color.origin` should be provided along with `color.light` and `color.dark`!',
      );
    }

    if (typeof origin !== 'string') {
      throw new Error('[Plaza-UI] : `color.origin` should be a string!');
    }

    if (light && typeof light !== 'string') {
      throw new Error('[Plaza-UI] : `color.light` should be a string!');
    }

    if (dark && typeof dark !== 'string') {
      throw new Error('[Plaza-UI] : `color.dark` should be a string!');
    }

    pairing.origin = origin;

    if (!light) {
      pairing.light = createLightVariant(origin);
    } else pairing.light = light;

    if (!dark) {
      pairing.dark = createDarkVariant(origin);
    } else pairing.dark = dark;
  } else {
    throw new Error(
      [
        '[Plaza-UI]: The color format provided to `theme` is invalid!',
        'The colors can either be a `string` (representing the origin) or an `object` with `origin`, `light` and `dark` properties.',
      ].join('\n'),
    );
  }

  return pairing;
};

const CreateColors = (colors: ColorsInputs, themeMode = 'light'): IColors => {
  const {
    primary: primaryInput = defaultSystemColors.primary,
    secondary: secondaryInput = defaultSystemColors.secondary,
    surface: surfaceInput = defaultSystemColors.surface,
    success: successInput = defaultSystemColors.success,
    danger: dangerInput = defaultSystemColors.danger,
    info: infoInput = defaultSystemColors.info,
    warning: warningInput = defaultSystemColors.warning,
    background: backgroundInput = defaultSystemColors.background,
    backgroundVariant:
      backgroundVariantInput = defaultSystemColors.backgroundVariant,
    backgroundVariant2:
      backgroundVariantInput2 = defaultSystemColors.backgroundVariant2,
    stroke: strokeInput = defaultSystemColors.stroke,
    strokeVariant: strokeVariantInput = defaultSystemColors.strokeVariant,
    text = defaultSystemColors.text,
    contrastThreshold: contrastThresholdInput = contrastThreshold,
    ...otherColors
  } = colors;

  const getContrastColorOf = (background: ColorInputType) => {
    const primaryContrast = calculateContrastRatio(background, text.primary);
    const invertContrast = calculateContrastRatio(background, text.invert);

    const contrastForeground =
      primaryContrast >= invertContrast ? text.primary : text.invert;

    if (process.env.NODE_ENV !== 'production') {
      const contrast = calculateContrastRatio(background, contrastForeground);

      if (contrast < 3.2) {
        // eslint-disable-next-line no-console
        console.error(
          [
            `[Plaza-UI] : The contrast ratio of ${contrast}:1 for ${contrastForeground} on ${background}`,
            'falls below the WCAG recommended absolute minimum contrast ratio of 3:1.',
            'https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast',
          ].join('\n'),
        );
      }
    }

    return contrastForeground;
  };
  const primary = completeSystemColor(primaryInput);
  const secondary = completeSystemColor(secondaryInput);
  const surface = completeSystemColor(surfaceInput);
  const success = completeSystemColor(successInput);
  const danger = completeSystemColor(dangerInput);
  const info = completeSystemColor(infoInput);
  const warning = completeSystemColor(warningInput);
  const background = completeSystemColor(backgroundInput);
  const backgroundVariant = completeSystemColor(backgroundVariantInput);
  const backgroundVariant2 = completeSystemColor(backgroundVariantInput2);
  const stroke = completeSystemColor(strokeInput);
  const strokeVariant = completeSystemColor(strokeVariantInput);
  const transparent = Color.rgb([255, 255, 255]).alpha(0).toString();
  const isDark = themeMode === 'dark';

  return {
    ...deepMerge(
      {
        primary,
        secondary,
        surface,
        success,
        danger,
        info,
        warning,
        background,
        backgroundVariant,
        backgroundVariant2,
        stroke,
        strokeVariant,
        text,
        transparent,
        contrastThreshold: contrastThresholdInput,
        getContrastColorOf,
        lighten,
        darken,
        tint,
        shade,
        changeAlpha,
      },
      otherColors,
    ),
    isDark,
    white,
    black,
  };
};

export default CreateColors;
