import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import AppleAltPaths from './paths/AppleAlt';
import Icon from './types/Icon';

type AppleAlt = typeof Icon;

const AppleAlt = createSvgIcon(AppleAltPaths, 'AppleAlt') as AppleAlt;

export default AppleAlt;
