import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MicrophonePaths from './paths/Microphone';
import Icon from './types/Icon';

type Microphone = typeof Icon;

const Microphone = createSvgIcon(MicrophonePaths, 'Microphone') as Microphone;

export default Microphone;
