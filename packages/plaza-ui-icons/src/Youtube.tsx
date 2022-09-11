import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import YoutubePaths from './paths/Youtube';
import Icon from './types/Icon';

type Youtube = typeof Icon;

const Youtube = createSvgIcon(YoutubePaths, 'Youtube') as Youtube;

export default Youtube;
