import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MobilePaths from './paths/Mobile';
import Icon from './types/Icon';

type Mobile = typeof Icon;

const Mobile = createSvgIcon(MobilePaths, 'Mobile') as Mobile;

export default Mobile;
