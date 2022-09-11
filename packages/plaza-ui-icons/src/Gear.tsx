import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import GearPaths from './paths/Gear';
import Icon from './types/Icon';

type Gear = typeof Icon;

const Gear = createSvgIcon(GearPaths, 'Gear') as Gear;

export default Gear;
