import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CameraPaths from './paths/Camera';
import Icon from './types/Icon';

type Camera = typeof Icon;

const Camera = createSvgIcon(CameraPaths, 'Camera') as Camera;

export default Camera;
