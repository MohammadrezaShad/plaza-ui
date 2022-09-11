import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import KeyPaths from './paths/Key';
import Icon from './types/Icon';

type Key = typeof Icon;

const Key = createSvgIcon(KeyPaths, 'Key') as Key;

export default Key;
