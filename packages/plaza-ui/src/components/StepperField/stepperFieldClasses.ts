import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface StepperFieldClasses {
  root: string;
}

export type StepperFieldClassKey = keyof StepperFieldClasses;

export function getStepperFieldUtilityClass(slot: string): string {
  return generateUtilityClass('PuiStepperField', slot);
}

const stepperFieldClasses: StepperFieldClasses = generateUtilityClasses(
  'PuiStepperField',
  ['root'],
);

export default stepperFieldClasses;
