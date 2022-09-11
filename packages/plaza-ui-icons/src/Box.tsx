import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BonPaths from './paths/Box';
import Icon from './types/Icon';

type Box = typeof Icon;

const Box = createSvgIcon(BonPaths, 'Box') as Box;

export default Box;
