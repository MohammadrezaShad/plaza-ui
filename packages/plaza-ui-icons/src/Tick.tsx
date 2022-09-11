import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TickPaths from './paths/Tick';
import Icon from './types/Icon';

type Tick = typeof Icon;

const Tick = createSvgIcon(TickPaths, 'Tick') as Tick;

export default Tick;
