import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import WrenchPaths from './paths/Wrench';
import Icon from './types/Icon';

type Wrench = typeof Icon;

const Wrench = createSvgIcon(WrenchPaths, 'Wrench') as Wrench;

export default Wrench;
