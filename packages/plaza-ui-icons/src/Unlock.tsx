import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import UnlockPaths from './paths/Unlock';
import Icon from './types/Icon';

type Unlock = typeof Icon;

const Unlock = createSvgIcon(UnlockPaths, 'Unlock') as Unlock;

export default Unlock;
