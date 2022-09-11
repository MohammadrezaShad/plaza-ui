import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TrophyPaths from './paths/Trophy';
import Icon from './types/Icon';

type Trophy = typeof Icon;

const Trophy = createSvgIcon(TrophyPaths, 'Trophy') as Trophy;

export default Trophy;
