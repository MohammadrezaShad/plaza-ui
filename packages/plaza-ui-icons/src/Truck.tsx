import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TruckPaths from './paths/Truck';
import Icon from './types/Icon';

type Truck = typeof Icon;

const Truck = createSvgIcon(TruckPaths, 'Truck') as Truck;

export default Truck;
