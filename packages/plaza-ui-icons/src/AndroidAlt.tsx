import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import AndroidAltPaths from './paths/AndroidAlt';
import Icon from './types/Icon';

type AndroidAlt = typeof Icon;

const AndroidAlt = createSvgIcon(AndroidAltPaths, 'AndroidAlt') as AndroidAlt;

export default AndroidAlt;
