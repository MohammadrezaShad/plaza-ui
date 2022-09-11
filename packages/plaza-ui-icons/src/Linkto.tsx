import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LinktoPaths from './paths/Linkto';
import Icon from './types/Icon';

type Linkto = typeof Icon;

const Linkto = createSvgIcon(LinktoPaths, 'Linkto') as Linkto;

export default Linkto;
