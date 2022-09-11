import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MartiniPaths from './paths/Martini';
import Icon from './types/Icon';

type Martini = typeof Icon;

const Martini = createSvgIcon(MartiniPaths, 'Martini') as Martini;

export default Martini;
