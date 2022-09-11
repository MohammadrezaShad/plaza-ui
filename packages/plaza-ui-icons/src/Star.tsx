import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import StarPaths from './paths/Star';
import Icon from './types/Icon';

type Star = typeof Icon;

const Star = createSvgIcon(StarPaths, 'Star') as Star;

export default Star;
