import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface ChipClasses {
  root: string;
  contained: string;
  outlined: string;
  pill: string;

  small: string;
  medium: string;

  primary: string;
  secondary: string;
  surface: string;
  success: string;
  danger: string;
  info: string;
  warning: string;
  label: string;
  icon?: string;
}

export type ButtonClassKey = keyof ChipClasses;

export function getChipUtilityClass(slot: string): string {
  return generateUtilityClass('PuiChip', slot);
}

const chipClasses: ChipClasses = generateUtilityClasses('PuiChip', [
  'root',
  'contained',
  'outlined',
  'pill',
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
  'label',
  'icon',
]);

export default chipClasses;
