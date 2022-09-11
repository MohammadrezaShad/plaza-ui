import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import AirplayPaths from './paths/Airplay';
import Icon from './types/Icon';

type Airplay = typeof Icon;

const Airplay = createSvgIcon(AirplayPaths, 'Airplay') as Airplay;

export default Airplay;
