import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LockPaths from './paths/Lock';
import Icon from './types/Icon';

type Lock = typeof Icon;

const Lock = createSvgIcon(LockPaths, 'Lock') as Lock;

export default Lock;
