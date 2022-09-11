import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import FacebookPaths from './paths/Facebook';
import Icon from './types/Icon';

type Facebook = typeof Icon;

const Facebook = createSvgIcon(FacebookPaths, 'Facebook') as Facebook;

export default Facebook;
