import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import EyeClosePaths from './paths/EyeClose';
import Icon from './types/Icon';

type EyeClose = typeof Icon;

const EyeClose = createSvgIcon(EyeClosePaths, 'EyeClose') as EyeClose;

export default EyeClose;
