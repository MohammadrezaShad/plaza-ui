import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LogoutPaths from './paths/Logout';
import Icon from './types/Icon';

type Logout = typeof Icon;

const Logout = createSvgIcon(LogoutPaths, 'Logout') as Logout;

export default Logout;
