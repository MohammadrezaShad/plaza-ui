import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import RestaurantPaths from './paths/Restaurant';
import Icon from './types/Icon';

type Restaurant = typeof Icon;

const Restaurant = createSvgIcon(RestaurantPaths, 'Restaurant') as Restaurant;

export default Restaurant;
