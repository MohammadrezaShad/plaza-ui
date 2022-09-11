/* eslint-disable no-underscore-dangle */
import Color from 'color';

export type ColorInputType = string | Color;

export type HslaType = {
  hue?: number;
  saturation?: number;
  lightness?: number;
  alpha?: number;
};

export function toRgb(color: ColorInputType) {
  return Color(color).rgb().toString();
}

export function toHex(color: ColorInputType) {
  return Color(color).hex().toString();
}

export function toHsl(color: ColorInputType) {
  return Color(color).hsl().toString();
}

export function getLuminance(color: ColorInputType) {
  return Color(color).luminosity();
}

export function calculateContrastRatio(
  foreground: ColorInputType,
  background: ColorInputType,
) {
  return Color(foreground).contrast(Color(background));
}

export function darken(color: ColorInputType, tonalOffset: number) {
  return toRgb(Color(color).darken(tonalOffset));
}

export function lighten(color: ColorInputType, tonalOffset: number) {
  return toRgb(Color(color).lighten(tonalOffset));
}

export function emphasize(color: ColorInputType, tonalOffset = 0.15) {
  return getLuminance(color) > 0.5
    ? darken(color, tonalOffset)
    : lighten(color, tonalOffset);
}

export function adjustColor(color: ColorInputType, adjustment: HslaType) {
  const _color = Color(color);
  const {hue = 0, saturation = 0, lightness = 0, alpha = 0} = adjustment;

  return toRgb(
    Color(color)
      .hue(_color.hue() + hue)
      .saturationl(_color.saturationl() + saturation)
      .lightness(_color.lightness() + lightness)
      .alpha(_color.alpha() + alpha),
  );
}

export function changeColor(color: ColorInputType, change: HslaType) {
  const _color = Color(color);
  const {
    hue = _color.hue(),
    saturation = _color.saturationl(),
    lightness = _color.lightness(),
    alpha = _color.alpha(),
  } = change;

  return toRgb(
    Color(color)
      .hue(hue)
      .saturationl(saturation)
      .lightness(lightness)
      .alpha(alpha),
  );
}

export function getComplement(color: ColorInputType) {
  const _color = Color(color);
  return toRgb(Color(color).hue((_color.hue() + 180) % 360));
}

export function getTriad(color: ColorInputType) {
  const _color = Color(color);
  return [
    toRgb(color),
    toRgb(Color(color).hue((_color.hue() + 120) % 360)),
    toRgb(Color(color).hue((_color.hue() + 240) % 360)),
  ];
}

export function getTetrad(color: ColorInputType) {
  const _color = Color(color);
  return [
    toRgb(color),
    toRgb(Color(color).hue((_color.hue() + 90) % 360)),
    toRgb(Color(color).hue((_color.hue() + 180) % 360)),
    toRgb(Color(color).hue((_color.hue() + 270) % 360)),
  ];
}

export function getSplitComplement(color: ColorInputType) {
  const _color = Color(color);
  return [
    toRgb(color),
    toRgb(Color(color).hue((_color.hue() + 72) % 360)),
    toRgb(Color(color).hue((_color.hue() + 216) % 360)),
  ];
}

export function mix(
  color1: ColorInputType,
  color2: ColorInputType,
  amount: number,
) {
  const mixAmount = amount === 0 ? 0 : amount || 50;
  const percentage = mixAmount / 100;

  const _color1 = Color(color1);
  const _color2 = Color(color2);

  const rgb = [
    (_color2.red() - _color1.red()) * percentage + _color1.red(),
    (_color2.green() - _color1.green()) * percentage + _color1.green(),
    (_color2.blue() - _color1.blue()) * percentage + _color1.blue(),
  ];

  return toRgb(
    Color.rgb(rgb).alpha(
      (_color2.alpha() - _color1.alpha()) * percentage + _color1.alpha(),
    ),
  );
}

export function multiply(color1: ColorInputType, color2: ColorInputType) {
  const _color1 = Color(color1);
  const _color2 = Color(color2);

  const rgb = [
    Math.floor((_color1.red() * _color2.red()) / 255),
    Math.floor((_color1.green() * _color2.green()) / 255),
    Math.floor((_color1.blue() * _color2.blue()) / 255),
  ];

  return toRgb(Color.rgb(rgb));
}

export function tint(color: ColorInputType, amount: number) {
  const baseLight = Color('#ffffff');
  const tintColor = Color(color).mix(baseLight, amount).rgb().toString();
  return tintColor;
}

export function shade(color: ColorInputType, amount: number) {
  const baseDark = Color('#000000');
  const shadeColor = Color(color).mix(baseDark, amount).rgb().toString();
  return shadeColor;
}

// eslint-disable-next-line @typescript-eslint/no-shadow
export function changeAlpha(color: ColorInputType, alpha: number) {
  const newColor = Color(color).alpha(alpha).rgb().toString();
  return newColor;
}

export function generateColorSet(color: ColorInputType) {
  const baseLight = Color('#ffffff').toString();
  const baseDark = multiply(color, color);

  return {
    50: mix(baseLight, color, 12),
    100: mix(baseLight, color, 30),
    200: mix(baseLight, color, 50),
    300: mix(baseLight, color, 70),
    400: mix(baseLight, color, 85),
    500: mix(baseLight, color, 100),
    600: mix(baseDark, color, 87),
    700: mix(baseDark, color, 70),
    800: mix(baseDark, color, 54),
    900: mix(baseDark, color, 25),
  };
}
