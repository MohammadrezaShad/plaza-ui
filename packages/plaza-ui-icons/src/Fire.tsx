import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import FirePaths from './paths/Fire';
import Icon from './types/Icon';

type Fire = typeof Icon;

const Fire = createSvgIcon(FirePaths, 'Fire') as Fire;

export default Fire;
