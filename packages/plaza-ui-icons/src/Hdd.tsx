import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import HddPaths from './paths/Hdd';
import Icon from './types/Icon';

type Hdd = typeof Icon;

const Hdd = createSvgIcon(HddPaths, 'Hdd') as Hdd;

export default Hdd;
