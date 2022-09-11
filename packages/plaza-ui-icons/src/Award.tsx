import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import AwardPaths from './paths/Award';
import Icon from './types/Icon';

type Award = typeof Icon;

const Award = createSvgIcon(AwardPaths, 'Award') as Award;

export default Award;
