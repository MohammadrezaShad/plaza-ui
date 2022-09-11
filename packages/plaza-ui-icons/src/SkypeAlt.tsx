import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SkypeAltPaths from './paths/SkypeAlt';
import Icon from './types/Icon';

type SkypeAlt = typeof Icon;

const SkypeAlt = createSvgIcon(SkypeAltPaths, 'SkypeAlt') as SkypeAlt;

export default SkypeAlt;
