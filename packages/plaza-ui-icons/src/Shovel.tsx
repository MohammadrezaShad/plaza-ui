import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ShovelPaths from './paths/Shovel';
import Icon from './types/Icon';

type Shovel = typeof Icon;

const Shovel = createSvgIcon(ShovelPaths, 'Shovel') as Shovel;

export default Shovel;
