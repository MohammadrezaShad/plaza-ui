import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BagPaths from './paths/Bag';
import Icon from './types/Icon';

type Bag = typeof Icon;

const Bag = createSvgIcon(BagPaths, 'Bag') as Bag;

export default Bag;
