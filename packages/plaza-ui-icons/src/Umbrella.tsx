import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import UmbrellaPaths from './paths/Umbrella';
import Icon from './types/Icon';

type Umbrella = typeof Icon;

const Umbrella = createSvgIcon(UmbrellaPaths, 'Umbrella') as Umbrella;

export default Umbrella;
