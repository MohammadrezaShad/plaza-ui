import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import DangerPaths from './paths/Danger';
import Icon from './types/Icon';

type Danger = typeof Icon;

const Danger = createSvgIcon(DangerPaths, 'Danger') as Danger;

export default Danger;
