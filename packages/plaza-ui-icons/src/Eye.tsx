import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import EyePaths from './paths/Eye';
import Icon from './types/Icon';

type Eye = typeof Icon;

const Eye = createSvgIcon(EyePaths, 'Eye') as Eye;

export default Eye;
