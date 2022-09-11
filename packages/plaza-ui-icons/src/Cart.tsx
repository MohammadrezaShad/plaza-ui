import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CartPaths from './paths/Cart';
import Icon from './types/Icon';

type Cart = typeof Icon;

const Cart = createSvgIcon(CartPaths, 'CartPaths') as Cart;

export default Cart;
