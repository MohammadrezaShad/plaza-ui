import {useContext} from 'react';
import {CSSObject, DefaultTheme, ThemeContext} from 'styled-components';

export type CSSObjectValue = CSSObject | string | number | undefined;

export interface CSSObjectWithTheme {
  [key: string]: CSSObjectValue | ((theme: DefaultTheme) => CSSObjectValue);
}

export type SxType = CSSObjectWithTheme | CSSObject;

const mapStringToTheme = (value: string, theme: DefaultTheme): string => {
  let style: string | null = null;
  Object.keys(theme).forEach(themeKey => {
    if (value.includes(themeKey)) {
      const keywords = value.split('.');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const apply = (KEY: any, VALUE: string) => KEY && KEY[VALUE];
      if (keywords[0] === themeKey) {
        style = apply(theme, keywords[0]);
        keywords.splice(1).forEach(keyword => {
          style = apply(style, keyword);
        });
      }
    }
  });
  return style || value;
};

const useSxProp = (sx: SxType | undefined): CSSObject => {
  const theme = useContext(ThemeContext);

  const getSxStyles = (sxInput: SxType) => {
    const cssObj: CSSObject = {};

    Object.keys(sxInput).forEach(sxKey => {
      const value = sxInput[sxKey];

      if (typeof value === 'string') {
        cssObj[sxKey] = mapStringToTheme(value, theme);
      } else if (typeof value === 'function') {
        cssObj[sxKey] = value(theme) as CSSObjectValue;
      } else if (typeof value === 'number') {
        if (sxKey.includes('padding') || sxKey.includes('margin')) {
          if (value <= 14 && value >= 1) {
            cssObj[sxKey] = theme.spacing(value);
          }
        } else {
          cssObj[sxKey] = theme.pxToRem(value);
        }
      } else if (typeof value === 'object') {
        const mappedToThemeValue = getSxStyles(value);
        cssObj[sxKey] = mappedToThemeValue;
      }
    });
    return cssObj;
  };
  const sxStyles = sx ? getSxStyles(sx) : {};

  return sxStyles;
};

export default useSxProp;
