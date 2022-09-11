import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import GiftPaths from './paths/Gift';
import Icon from './types/Icon';

type Gift = typeof Icon;

const Gift = createSvgIcon(GiftPaths, 'Gift') as Gift;

export default Gift;
