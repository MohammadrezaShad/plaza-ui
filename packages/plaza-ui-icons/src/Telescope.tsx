import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TelescopePaths from './paths/Telescope';
import Icon from './types/Icon';

type Telescope = typeof Icon;

const Telescope = createSvgIcon(TelescopePaths, 'Telescope') as Telescope;

export default Telescope;
