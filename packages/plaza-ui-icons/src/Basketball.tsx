import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BasketballPaths from './paths/Basketball';
import Icon from './types/Icon';

type Basketball = typeof Icon;

const Basketball = createSvgIcon(BasketballPaths, 'Basketball') as Basketball;

export default Basketball;
