import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ClosePaths from './paths/Close';
import Icon from './types/Icon';

type Close = typeof Icon;

const Close = createSvgIcon(ClosePaths, 'Close') as Close;

export default Close;
