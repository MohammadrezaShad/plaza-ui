import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import DumbbellPaths from './paths/Dumbbell';
import Icon from './types/Icon';

type Dumbbell = typeof Icon;

const Dumbbell = createSvgIcon(DumbbellPaths, 'Dumbbell') as Dumbbell;

export default Dumbbell;
