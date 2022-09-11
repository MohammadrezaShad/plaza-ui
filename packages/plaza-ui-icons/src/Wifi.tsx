import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import WifiPaths from './paths/Wifi';
import Icon from './types/Icon';

type Wifi = typeof Icon;

const Wifi = createSvgIcon(WifiPaths, 'Wifi') as Wifi;

export default Wifi;
