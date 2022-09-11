import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import PlanePaths from './paths/Plane';
import Icon from './types/Icon';

type Plane = typeof Icon;

const Plane = createSvgIcon(PlanePaths, 'Plane') as Plane;

export default Plane;
