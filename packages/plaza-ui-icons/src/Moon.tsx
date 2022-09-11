import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MoonPaths from './paths/Moon';
import Icon from './types/Icon';

type Moon = typeof Icon;

const Moon = createSvgIcon(MoonPaths, 'Moon') as Moon;

export default Moon;
