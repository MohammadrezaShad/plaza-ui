/* eslint-disable @typescript-eslint/no-shadow */
import {CSSProperties} from 'react';
import {SimpleInterpolation} from 'styled-components';

export const plazaRtlFontFamily = 'IRANYekan,Sans-serif';
export const plazaLtrFontFamily = `"Ubuntu","Roboto", -apple-system, BlinkMacSystemFont, "Segoe UI",
"Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji",
"Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`;
export const plazaMonospaceFontFamily = `"Roboto Mono", "SFMono-Regular", "Menlo", "Monaco",
"Consolas", "Liberation Mono", "Courier New", "monospace"`;

export const plazaFontSize = 16;
export const defaultHtmlFontSize = 16;
export const plazaFontWeight = {
  light: 300,
  regular: 400,
  bold: 600,
};

export type VariantNames =
  | 'title1'
  | 'title2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'button1'
  | 'button2'
  | 'button3'
  | 'caption'
  | 'link'
  | 'overline'
  | 'discount'
  | 'price1'
  | 'price2'
  | 'price3';

export type VariantProps = {
  [Property in VariantNames]: SimpleInterpolation;
};

export interface FontWeights {
  light: number;
  regular: number;
  bold: number;
}

export interface FontFamilies {
  ltr: string;
  rtl: string;
  monospace: string;
}

export type PxToRem = (size: number) => string;
export interface TypographyOutput {
  fontWeight: FontWeights;
  fontFamily: FontFamilies;
  fontSize: number;
  htmlFontSize: number;
  useText: (textProperties: {
    fontSize?: string | number;
    fontWeight?: CSSProperties['fontWeight'];
    lineHeight?: string | number;
    color?: CSSProperties['color'];
  }) => SimpleInterpolation;
  pxToRem: PxToRem;
  remToPx: (size: number) => string;
  variants: VariantProps;
}

export interface TypographyInputs {
  fontSize?: number;
  htmlFontSize?: number;
  ltrFontFamily?: string;
  rtlFontFamily?: string;
  monospaceFontFamily?: string;
}

export interface TextProperties {
  fontSize?: string | number;
  fontWeight?: CSSProperties['fontWeight'];
  lineHeight?: string | number;
  color?: CSSProperties['color'];
  textDecoration?: CSSProperties['textDecoration'];
}

const createTypography = (typography: TypographyInputs): TypographyOutput => {
  const {
    fontSize = plazaFontSize,
    htmlFontSize = defaultHtmlFontSize,
    ltrFontFamily = plazaLtrFontFamily,
    rtlFontFamily = plazaRtlFontFamily,
    monospaceFontFamily = plazaMonospaceFontFamily,
  } = typography;
  if (process.env.NODE_ENV !== 'production') {
    if (typeof fontSize !== 'number') {
      // eslint-disable-next-line no-console
      console.error('[Plaza-UI] : `fontSize` is required to be a number.');
    }

    if (typeof htmlFontSize !== 'number') {
      // eslint-disable-next-line no-console
      console.error('[Plaza-UI] : `htmlFontSize` is required to be a number.');
    }
  }

  const round = (number: number, decimalPlaces = 3) => {
    // eslint-disable-next-line no-restricted-properties
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(number * factorOfTen) / factorOfTen;
  };

  const coef = fontSize / plazaFontSize;
  const pxToRem = (size: number) =>
    // eslint-disable-next-line no-restricted-globals
    typeof size === 'number' && !isNaN(size)
      ? `${round((size / htmlFontSize) * coef)}rem`
      : '';

  const remToPx = (size: number) =>
    // eslint-disable-next-line no-restricted-globals
    typeof size === 'number' && !isNaN(size)
      ? `${round((size * htmlFontSize) / coef)}px`
      : '';

  const useText = (textProperties: TextProperties = {}) => {
    const {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      fontSize = pxToRem(16),
      fontWeight = plazaFontWeight.regular,
      lineHeight = 2,
      color,
      textDecoration,
    } = textProperties;

    return {
      lineHeight,
      fontSize,
      fontWeight,
      color,
      textDecoration,
      fontStyle: 'normal',
      fontFamily: 'inherit',
      fontStretch: 'normal',
      letterSpacing: 'normal',
      textSizeAdjust: '100%',
    };
  };

  const buildVariant = (
    fontWeight: number,
    fontSize: number,
    lineHeight: number,
    textDecoration?: CSSProperties['textDecoration'],
  ) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useText({
      fontSize: pxToRem(fontSize),
      fontWeight,
      lineHeight,
      textDecoration,
    });

  const variants = {
    title1: buildVariant(plazaFontWeight.bold, 48, 1.5),
    title2: buildVariant(plazaFontWeight.bold, 40, 1.5),
    h1: buildVariant(plazaFontWeight.bold, 32, 1.5),
    h2: buildVariant(plazaFontWeight.bold, 28, 1.5),
    h3: buildVariant(plazaFontWeight.bold, 24, 1.5),
    h4: buildVariant(plazaFontWeight.bold, 18, 1.5),
    subtitle1: buildVariant(plazaFontWeight.bold, 16, 1.5),
    subtitle2: buildVariant(plazaFontWeight.bold, 14, 1.5),
    body1: buildVariant(plazaFontWeight.regular, 16, 1.5),
    body2: buildVariant(plazaFontWeight.regular, 14, 1.5),
    button1: buildVariant(plazaFontWeight.regular, 18, 1.5),
    button2: buildVariant(plazaFontWeight.regular, 14, 1.5),
    button3: buildVariant(plazaFontWeight.regular, 12, 1.5),
    caption: buildVariant(plazaFontWeight.regular, 12, 1.5),
    overline: buildVariant(plazaFontWeight.regular, 11, 1.5),
    link: buildVariant(plazaFontWeight.regular, 16, 1.5, 'underline'),
    discount: buildVariant(plazaFontWeight.regular, 16, 1.5, 'line-through'),
    price1: buildVariant(plazaFontWeight.bold, 32, 1.5),
    price2: buildVariant(plazaFontWeight.bold, 24, 1.5),
    price3: buildVariant(plazaFontWeight.bold, 16, 1.5),
  };

  return {
    fontWeight: plazaFontWeight,
    fontFamily: {
      ltr: ltrFontFamily,
      rtl: rtlFontFamily,
      monospace: monospaceFontFamily,
    },
    pxToRem,
    remToPx,
    fontSize,
    htmlFontSize,
    useText,
    variants,
  };
};

export default createTypography;
