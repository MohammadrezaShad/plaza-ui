import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SupportPaths from './paths/Support';
import Icon from './types/Icon';

type Support = typeof Icon;

const Support = createSvgIcon(SupportPaths, 'Support') as Support;

export default Support;
