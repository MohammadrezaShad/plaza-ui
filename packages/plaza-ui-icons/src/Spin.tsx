import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SpinPaths from './paths/Spin';
import Icon from './types/Icon';

type Spin = typeof Icon;

const Spin = createSvgIcon(SpinPaths, 'Spin') as Spin;

export default Spin;
