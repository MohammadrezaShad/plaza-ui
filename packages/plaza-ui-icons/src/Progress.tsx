import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ProgressPaths from './paths/Progress';
import Icon from './types/Icon';

type Progress = typeof Icon;

const Progress = createSvgIcon(ProgressPaths, 'Progress') as Progress;

export default Progress;
