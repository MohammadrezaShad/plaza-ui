import {VariantNames} from '@plaza-ui/styles/lib/createTypography';
import generateUtilityClass from '@plaza-ui/utils/lib/generateUtilityClass';
import generateUtilityClasses from '@plaza-ui/utils/lib/generateUtilityClasses';

export type VariantNamesClasses = {
  [Property in VariantNames]: string;
};

export interface TypographyClasses extends VariantNamesClasses {
  root: string;
  noWrap: string;
  paragraph: string;
}

export type TypographyClassKey = keyof TypographyClasses;

export function getTypographyUtilityClass(slot: string): string {
  return generateUtilityClass('PuiTypography', slot);
}
const typographyClasses: TypographyClasses = generateUtilityClasses(
  'PuiTypography',
  [
    'root',
    'title1',
    'title2',
    'h1',
    'h2',
    'h3',
    'h4',
    'subtitle1',
    'subtitle2',
    'body1',
    'body2',
    'button1',
    'button2',
    'button3',
    'caption',
    'link',
    'overline',
    'discount',
    'price1',
    'price2',
    'price3',
    'noWrap',
    'paragraph',
  ],
);

export default typographyClasses;
