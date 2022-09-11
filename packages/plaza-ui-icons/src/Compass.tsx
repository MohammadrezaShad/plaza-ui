import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CompassPaths from './paths/Compass';
import Icon from './types/Icon';

type Compass = typeof Icon;

const Compass = createSvgIcon(CompassPaths, 'Compass') as Compass;

export default Compass;
