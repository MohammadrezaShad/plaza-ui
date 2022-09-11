import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import UserPaths from './paths/User';
import Icon from './types/Icon';

type User = typeof Icon;

const User = createSvgIcon(UserPaths, 'User') as User;

export default User;
