import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BuildingPaths from './paths/Building';
import Icon from './types/Icon';

type Building = typeof Icon;

const Building = createSvgIcon(BuildingPaths, 'Building') as Building;

export default Building;
