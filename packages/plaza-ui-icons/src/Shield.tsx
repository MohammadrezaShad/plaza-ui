import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ShieldPaths from './paths/Shield';
import Icon from './types/Icon';

type Shield = typeof Icon;

const Shield = createSvgIcon(ShieldPaths, 'Shield') as Shield;

export default Shield;
