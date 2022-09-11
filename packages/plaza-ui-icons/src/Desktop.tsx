import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import DesktopPaths from './paths/Desktop';
import Icon from './types/Icon';

type Desktop = typeof Icon;

const Desktop = createSvgIcon(DesktopPaths, 'Desktop') as Desktop;

export default Desktop;
