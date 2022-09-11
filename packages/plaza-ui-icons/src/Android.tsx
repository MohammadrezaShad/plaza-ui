import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import AndroidPaths from './paths/Android';
import Icon from './types/Icon';

type Android = typeof Icon;

const Android = createSvgIcon(AndroidPaths, 'Android') as Android;

export default Android;
