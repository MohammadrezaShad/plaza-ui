import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import DeliveryPaths from './paths/Delivery';
import Icon from './types/Icon';

type Delivery = typeof Icon;

const Delivery = createSvgIcon(DeliveryPaths, 'Delivery') as Delivery;

export default Delivery;
