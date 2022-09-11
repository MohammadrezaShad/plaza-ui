import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import PlusPaths from './paths/Plus';
import Icon from './types/Icon';

type Plus = typeof Icon;

const Plus = createSvgIcon(PlusPaths, 'Plus') as Plus;

export default Plus;
