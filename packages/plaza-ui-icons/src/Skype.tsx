import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SkypePaths from './paths/Skype';
import Icon from './types/Icon';

type Skype = typeof Icon;

const Skype = createSvgIcon(SkypePaths, 'Skype') as Skype;

export default Skype;
