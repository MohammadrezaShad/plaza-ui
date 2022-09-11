import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import VideoPaths from './paths/Video';
import Icon from './types/Icon';

type Video = typeof Icon;

const Video = createSvgIcon(VideoPaths, 'Video') as Video;

export default Video;
