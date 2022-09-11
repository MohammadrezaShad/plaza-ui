import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import StorePaths from './paths/Store';
import Icon from './types/Icon';

type Store = typeof Icon;

const Store = createSvgIcon(StorePaths, 'Store') as Store;

export default Store;
