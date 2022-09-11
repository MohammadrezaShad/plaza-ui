import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import VolumeUpPaths from './paths/VolumeUp';
import Icon from './types/Icon';

type VolumeUp = typeof Icon;

const VolumeUp = createSvgIcon(VolumeUpPaths, 'VolumeUp') as VolumeUp;

export default VolumeUp;
