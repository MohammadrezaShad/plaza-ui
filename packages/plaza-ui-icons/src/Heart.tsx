import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import HeartPaths from './paths/Heart';
import Icon from './types/Icon';

type Heart = typeof Icon;

const Heart = createSvgIcon(HeartPaths, 'Heart') as Heart;

export default Heart;
