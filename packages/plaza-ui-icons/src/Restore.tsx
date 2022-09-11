import Icon from './types/Icon';
import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import RestorePaths from './paths/Restore';

type Restore = typeof Icon;

const Restore = createSvgIcon(RestorePaths, 'Restore') as Restore;

export default Restore;
