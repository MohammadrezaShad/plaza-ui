import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MousePaths from './paths/Mouse';
import Icon from './types/Icon';

type Mouse = typeof Icon;

const Mouse = createSvgIcon(MousePaths, 'Mouse') as Mouse;

export default Mouse;
