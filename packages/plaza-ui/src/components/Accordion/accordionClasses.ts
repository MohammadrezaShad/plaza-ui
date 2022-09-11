import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface AccordionClasses {
  /** Styles applied to the root element. */
  root: string;
  /** Styles applied to the root element unless `square={true}`. */
  rounded: string;
  /** State class applied to the root element if `expanded={true}`. */
  expanded: string;
  /** State class applied to the root element if `disabled={true}`. */
  disabled: string;
  /** Styles applied to the root element unless `disableGutters={true}`. */
  gutters: string;
  /** Styles applied to the region element, the container of the children. */
  region: string;
}

export type AccordionClassKey = keyof AccordionClasses;

export function getAccordionUtilityClass(slot: string): string {
  return generateUtilityClass('PuiAccordion', slot);
}

const accordionClasses: AccordionClasses = generateUtilityClasses(
  'PuiAccordion',
  ['root', 'rounded', 'expanded', 'disabled', 'gutters', 'region'],
);

export default accordionClasses;
