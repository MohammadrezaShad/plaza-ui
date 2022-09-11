import deepMerge from '@plaza-ui/utils/lib/deepMerge';
import {SimpleInterpolation} from 'styled-components';

import createBreakpoints, {
  Breakpoints,
  BreakpointsInputs,
} from './createBreakpoints';
import createColors, {ColorsInputs, IColors} from './createColors';
import createMixins, {MixinOptions, Mixins} from './createMixin';
import createRadiuses, {Radius, RadiusInput} from './createRadiuses';
import createShadows, {ShadowInputs, Shadows} from './createShadows';
import createSpacings, {Spacings, SpacingsInputs} from './createSpacings';
import createTransitionProperties, {
  TransitionPropertiesInputs,
} from './createTransitionProperties';
import createTypography, {
  TypographyInputs,
  TypographyOutput,
} from './createTypography';
import createZIndexes, {ZIndexes, ZIndexesInputs} from './createZIndexes';
import {disabledStyles as defaultDisabledStyles} from './disabledStyles';

export interface ThemeOptions {
  breakpoints?: BreakpointsInputs;
  colors?: ColorsInputs;
  typography?: TypographyInputs;
  spacings?: SpacingsInputs;
  darkMode?: boolean;
  shadows?: ShadowInputs;
  radiuses?: RadiusInput;
  transition?: TransitionPropertiesInputs;
  direction?: 'rtl' | 'ltr';
  mixins?: MixinOptions;
  zIndexes?: ZIndexesInputs;
  disabledStyles?: SimpleInterpolation;
}

export interface Theme {
  breakpoints: Breakpoints;
  colors: IColors;
  typography: TypographyOutput;
  spacing: Spacings;
  shadows: Shadows;
  darkMode: boolean;
  radius: Radius;
  transition: Required<TransitionPropertiesInputs>;
  pxToRem: (size: number) => string;
  direction: 'rtl' | 'ltr';
  mixins: Mixins;
  zIndexes: ZIndexes;
  disabledStyles: SimpleInterpolation;
  hacks: {
    backfaceVisibilityFix: SimpleInterpolation;
  };
}

const createTheme = (options: ThemeOptions = {}): Theme => {
  const {
    breakpoints: breakpointsInput = {},
    colors: colorsInput = {},
    typography: typographyInput = {},
    spacings: spacingsInput = {},
    shadows: shadowsInput = {},
    radiuses: radiusesInput = {},
    darkMode: isDarkMode = false,
    direction = 'rtl',
    transition: transitionInputs = {},
    mixins: mixinsInput = {},
    zIndexes: zIndexesInput = {},
    disabledStyles = defaultDisabledStyles,
    ...otherOptions
  } = options;

  const breakpoints = createBreakpoints(breakpointsInput);
  const colors = createColors({...colorsInput}, isDarkMode ? 'dark' : 'light');

  const typography = createTypography(typographyInput);

  const spacing = createSpacings({
    ...spacingsInput,
    pxToRem: typography.pxToRem,
  });
  const shadows = createShadows({
    ...shadowsInput,
    color: isDarkMode ? colors.white : colors.black,
    pxToRem: typography.pxToRem,
  });
  const radius = createRadiuses({
    ...radiusesInput,
    pxToRem: typography.pxToRem,
  });

  const transition = createTransitionProperties(transitionInputs);

  const mixins = createMixins(mixinsInput, {
    pxToRem: typography.pxToRem,
  });

  const backfaceVisibilityFix = {
    WebkitBackfaceVisibility: 'hidden',
    MozBackfaceVisibility: 'hidden',
    backfaceVisibility: 'hidden',
    WebkitTransform: 'translate3d(0, 0, 0)',
    MozTransform: 'translate3d(0, 0, 0)',
    transform: 'translate3d(0, 0, 0)',
  };

  const hacks = {
    // Use on the element with overflow
    // Also add negative-index for the image and a higher value for the parent,
    // In case of image overflow-bug.
    backfaceVisibilityFix,
  };

  const zIndexes = createZIndexes(zIndexesInput);

  const theme = deepMerge(
    {
      colors,
      breakpoints,
      typography,
      spacing,
      shadows,
      radius,
      darkMode: isDarkMode,
      direction,
      pxToRem: typography.pxToRem,
      transition,
      mixins,
      hacks,
      zIndexes,
      disabledStyles,
    },
    otherOptions,
  );

  return theme;
};

export default createTheme;
