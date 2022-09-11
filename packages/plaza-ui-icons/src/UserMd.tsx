import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import UserMdPaths from './paths/UserMd';
import Icon from './types/Icon';

type UserMd = typeof Icon;

const UserMd = createSvgIcon(UserMdPaths, 'UserMd') as UserMd;

export default UserMd;
