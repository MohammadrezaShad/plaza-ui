import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import DrillPaths from './paths/Drill';
import Icon from './types/Icon';

type Drill = typeof Icon;

const Drill = createSvgIcon(DrillPaths, 'Drill') as Drill;

export default Drill;
