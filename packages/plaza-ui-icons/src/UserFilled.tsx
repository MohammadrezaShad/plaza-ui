import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import UserFilledPaths from './paths/UserFilled';
import Icon from './types/Icon';

type UserFilled = typeof Icon;

const UserFilled = createSvgIcon(UserFilledPaths, 'UserFilled') as UserFilled;

export default UserFilled;
