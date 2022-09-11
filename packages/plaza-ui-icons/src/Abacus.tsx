import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import AbacusPaths from './paths/Abacus';
import Icon from './types/Icon';

type Abacus = typeof Icon;

const Abacus = createSvgIcon(AbacusPaths, 'Abacus') as Abacus;

export default Abacus;
