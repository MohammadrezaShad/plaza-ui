import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import RainDropsPaths from './paths/RainDrops';
import Icon from './types/Icon';

type RainDrops = typeof Icon;

const RainDrops = createSvgIcon(RainDropsPaths, 'RainDrops') as RainDrops;

export default RainDrops;
