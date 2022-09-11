import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BedPaths from './paths/Bed';
import Icon from './types/Icon';

type Bed = typeof Icon;

const Bed = createSvgIcon(BedPaths, 'Bed') as Bed;

export default Bed;
