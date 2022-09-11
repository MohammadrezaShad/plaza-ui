import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BackpackPaths from './paths/Backpack';
import Icon from './types/Icon';

type Backpack = typeof Icon;

const Backpack = createSvgIcon(BackpackPaths, 'Backpack') as Backpack;

export default Backpack;
