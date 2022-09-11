import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import RocketPaths from './paths/Rocket';
import Icon from './types/Icon';

type Rocket = typeof Icon;

const Rocket = createSvgIcon(RocketPaths, 'Rocket') as Rocket;

export default Rocket;
