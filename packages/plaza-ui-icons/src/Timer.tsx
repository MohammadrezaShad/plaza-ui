import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TimerPaths from './paths/Timer';
import Icon from './types/Icon';

type Timer = typeof Icon;

const Timer = createSvgIcon(TimerPaths, 'Timer') as Timer;

export default Timer;
