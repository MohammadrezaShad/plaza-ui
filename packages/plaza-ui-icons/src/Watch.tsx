import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import WatchPaths from './paths/Watch';
import Icon from './types/Icon';

type Watch = typeof Icon;

const Watch = createSvgIcon(WatchPaths, 'Watch') as Watch;

export default Watch;
