import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ProfilePaths from './paths/Profile';
import Icon from './types/Icon';

type Profile = typeof Icon;

const Profile = createSvgIcon(ProfilePaths, 'Profile') as Profile;

export default Profile;
