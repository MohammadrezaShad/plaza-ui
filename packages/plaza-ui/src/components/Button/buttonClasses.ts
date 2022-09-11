import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface ButtonClasses {
  root: string;
  contained: string;
  outlined: string;
  text: string;

  disabled: string;

  small: string;
  medium: string;
  large: string;

  primary: string;
  secondary: string;
  surface: string;
  success: string;
  danger: string;
  info: string;
  warning: string;
  background: string;
  backgroundVariant: string;
  backgroundVariant2: string;
  stroke: string;
  strokeVariant: string;
  textPrimary: string;
  textSecondary: string;
  textPrice: string;
  textInvert: string;
  link: string;
  icon?: string;
}

export type ButtonClassKey = keyof ButtonClasses;

export function getButtonUtilityClass(slot: string): string {
  return generateUtilityClass('PuiButton', slot);
}

const buttonClasses: ButtonClasses = generateUtilityClasses('PuiButton', [
  'root',
  'contained',
  'outlined',
  'disabled',
  'text',
  'small',
  'medium',
  'large',
  'primary',
  'secondary',
  'surface',
  'success',
  'danger',
  'info',
  'warning',
  'background',
  'backgroundVariant',
  'backgroundVariant2',
  'stroke',
  'strokeVariant',
  'textPrimary',
  'textSecondary',
  'textPrice',
  'textInvert',
  'link',
  'icon',
]);

export default buttonClasses;
