import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import GrcodePaths from './paths/Grcode';
import Icon from './types/Icon';

type Grcode = typeof Icon;

const Grcode = createSvgIcon(GrcodePaths, 'Grcode') as Grcode;

export default Grcode;
