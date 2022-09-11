import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import VolumeMutePaths from './paths/VolumeMute';
import Icon from './types/Icon';

type VolumeMute = typeof Icon;

const VolumeMute = createSvgIcon(VolumeMutePaths, 'VolumeMute') as VolumeMute;

export default VolumeMute;
