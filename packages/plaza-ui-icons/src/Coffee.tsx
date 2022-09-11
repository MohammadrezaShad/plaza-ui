import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CoffeePaths from './paths/Coffee';
import Icon from './types/Icon';

type Coffee = typeof Icon;

const Coffee = createSvgIcon(CoffeePaths, 'Coffee') as Coffee;

export default Coffee;
