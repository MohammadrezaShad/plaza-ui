import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import EyeOpenPaths from './paths/EyeOpen';
import Icon from './types/Icon';

type EyeOpen = typeof Icon;

const EyeOpen = createSvgIcon(EyeOpenPaths, 'EyeOpen') as EyeOpen;

export default EyeOpen;
