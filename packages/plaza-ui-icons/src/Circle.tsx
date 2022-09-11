import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CirclePaths from './paths/Circle';
import Icon from './types/Icon';

type Circle = typeof Icon;

const Circle = createSvgIcon(CirclePaths, 'Circle') as Circle;

export default Circle;
