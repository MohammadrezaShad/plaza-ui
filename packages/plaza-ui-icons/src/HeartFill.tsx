import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import HeartFillPaths from './paths/HeartFill';
import Icon from './types/Icon';

type HeartFill = typeof Icon;

const HeartFill = createSvgIcon(HeartFillPaths, 'HeartFill') as HeartFill;

export default HeartFill;
