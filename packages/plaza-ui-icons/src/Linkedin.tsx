import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LinkedinPaths from './paths/Linkedin';
import Icon from './types/Icon';

type Linkedin = typeof Icon;

const Linkedin = createSvgIcon(LinkedinPaths, 'Linkedin') as Linkedin;

export default Linkedin;
