import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import AccessiblePaths from './paths/Accessible';
import Icon from './types/Icon';

type Accessible = typeof Icon;

const Accessible = createSvgIcon(AccessiblePaths, 'Accessible') as Accessible;

export default Accessible;
