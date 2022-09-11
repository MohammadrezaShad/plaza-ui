import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BoltPaths from './paths/Bolt';
import Icon from './types/Icon';

type Bolt = typeof Icon;

const Bolt = createSvgIcon(BoltPaths, 'Bolt') as Bolt;

export default Bolt;
