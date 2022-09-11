import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ShoppingBasketPaths from './paths/ShoppingBasket';
import Icon from './types/Icon';

type ShoppingBasket = typeof Icon;

const ShoppingBasket = createSvgIcon(
  ShoppingBasketPaths,
  'ShoppingBasket',
) as ShoppingBasket;

export default ShoppingBasket;
