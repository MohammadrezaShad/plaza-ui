import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import OrderPaths from './paths/Order';
import Icon from './types/Icon';

type Order = typeof Icon;

const Order = createSvgIcon(OrderPaths, 'Order') as Order;

export default Order;
