import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import InstagramPaths from './paths/Instagram';
import Icon from './types/Icon';

type Instagram = typeof Icon;

const Instagram = createSvgIcon(InstagramPaths, 'Instagram') as Instagram;

export default Instagram;
