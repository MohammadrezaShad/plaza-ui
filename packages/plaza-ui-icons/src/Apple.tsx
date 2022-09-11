import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ApplePaths from './paths/Apple';
import Icon from './types/Icon';

type Apple = typeof Icon;

const Apple = createSvgIcon(ApplePaths, 'Apple') as Apple;

export default Apple;
