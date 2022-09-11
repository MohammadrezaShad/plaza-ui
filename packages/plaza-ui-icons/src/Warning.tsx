import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import WarningPaths from './paths/Warning';
import Icon from './types/Icon';

type Video = typeof Icon;

const Warning = createSvgIcon(WarningPaths, 'Warning') as Video;

export default Warning;
