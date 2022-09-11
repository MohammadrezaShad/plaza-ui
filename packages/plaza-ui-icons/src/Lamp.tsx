import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LampPaths from './paths/Lamp';
import Icon from './types/Icon';

type Lamp = typeof Icon;

const Lamp = createSvgIcon(LampPaths, 'Lamp') as Lamp;

export default Lamp;
