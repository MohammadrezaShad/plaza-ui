import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import GooglePlayPaths from './paths/GooglePlay';
import Icon from './types/Icon';

type GooglePlay = typeof Icon;

const GooglePlay = createSvgIcon(GooglePlayPaths, 'GooglePlay') as GooglePlay;

export default GooglePlay;
