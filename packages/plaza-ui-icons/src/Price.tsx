import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import PricePaths from './paths/Price';
import Icon from './types/Icon';

type Price = typeof Icon;

const Price = createSvgIcon(PricePaths, 'Price') as Price;

export default Price;
