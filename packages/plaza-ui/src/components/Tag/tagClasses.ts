import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface TagClasses {
  root: string;
  contained: string;
  outlined: string;
  text: string;

  small: string;
  normal: string;
  large: string;

  outlinedPrimary: string;
  outlinedSecondary: string;
  outlinedSurface: string;
  outlinedStrokeVariant: string;
  outlinedDark: string;
  outlinedSuccess: string;
  outlinedInfo: string;
  outlinedWarning: string;
  outlinedDanger: string;

  containedPrimary: string;
  containedSecondary: string;
  containedSurface: string;
  containedStrokeVariant: string;
  containedDark: string;
  containedSuccess: string;
  containedInfo: string;
  containedWarning: string;
  containedDanger: string;

  textPrimary: string;
  textSecondary: string;
  textSurface: string;
  textStrokeVariant: string;
  textDark: string;
  textSuccess: string;
  textInfo: string;
  textWarning: string;
  textDanger: string;
}

export type TagClassKey = keyof TagClasses;

export function getTagUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTag', slot);
}

const tagClasses: TagClasses = generateUtilityClasses('PuiTag', [
  'root',
  'contained',
  'outlined',
  'text',
  'small',
  'normal',
  'large',
  'outlinedPrimary',
  'outlinedSecondary',
  'outlinedSurface',
  'outlinedStrokeVariant',
  'outlinedDark',
  'outlinedSuccess',
  'outlinedInfo',
  'outlinedWarning',
  'outlinedDanger',
  'containedPrimary',
  'containedSecondary',
  'containedSurface',
  'containedStrokeVariant',
  'containedDark',
  'containedSuccess',
  'containedInfo',
  'containedWarning',
  'containedDanger',
  'textPrimary',
  'textSecondary',
  'textSurface',
  'textStrokeVariant',
  'textDark',
  'textSuccess',
  'textInfo',
  'textWarning',
  'textDanger',
]);

export default tagClasses;
