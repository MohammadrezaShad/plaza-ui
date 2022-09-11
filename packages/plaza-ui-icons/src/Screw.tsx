import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ScrewPaths from './paths/Screw';
import Icon from './types/Icon';

type Screw = typeof Icon;

const Screw = createSvgIcon(ScrewPaths, 'Screw') as Screw;

export default Screw;
