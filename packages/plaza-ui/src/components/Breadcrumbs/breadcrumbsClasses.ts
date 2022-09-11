import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export interface BreadcrumbsClasses {
  /** Styles applied to the root element. */
  root: string;
  icon: string;
}

export type BreadcrumbsClassKey = keyof BreadcrumbsClasses;

export function getBreadcrumbsUtilityClass(slot: string): string {
  return generateUtilityClass('PuiBreadcrumbs', slot);
}

const breadcrumbsClasses: BreadcrumbsClasses = generateUtilityClasses(
  'PuiBreadcrumbs',
  ['root', 'icon'],
);

export default breadcrumbsClasses;
