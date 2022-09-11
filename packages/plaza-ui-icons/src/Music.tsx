import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MusicPaths from './paths/Music';
import Icon from './types/Icon';

type Music = typeof Icon;

const Music = createSvgIcon(MusicPaths, 'Music') as Music;

export default Music;
