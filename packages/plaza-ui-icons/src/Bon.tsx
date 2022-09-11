import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BonPaths from './paths/Bon';
import Icon from './types/Icon';

type Bon = typeof Icon;

const Bon = createSvgIcon(BonPaths, 'Bon') as Bon;

export default Bon;
