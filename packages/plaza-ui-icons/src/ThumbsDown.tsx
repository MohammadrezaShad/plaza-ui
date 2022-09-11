import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ThumbsDownPaths from './paths/ThumbsDown';
import Icon from './types/Icon';

type ThumbsDown = typeof Icon;

const ThumbsDown = createSvgIcon(ThumbsDownPaths, 'ThumbsDown') as ThumbsDown;

export default ThumbsDown;
