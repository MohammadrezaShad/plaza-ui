import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MagPaths from './paths/Mag';
import Icon from './types/Icon';

type Mag = typeof Icon;

const Mag = createSvgIcon(MagPaths, 'Mag') as Mag;

export default Mag;
