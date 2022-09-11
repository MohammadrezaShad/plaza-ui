import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ClipboardPaths from './paths/Clipboard';
import Icon from './types/Icon';

type Clipboard = typeof Icon;

const Clipboard = createSvgIcon(ClipboardPaths, 'Clipboard') as Clipboard;

export default Clipboard;
