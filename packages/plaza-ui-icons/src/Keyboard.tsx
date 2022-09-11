import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import KeyboardPaths from './paths/Keyboard';
import Icon from './types/Icon';

type Keyboard = typeof Icon;

const Keyboard = createSvgIcon(KeyboardPaths, 'Keyboard') as Keyboard;

export default Keyboard;
