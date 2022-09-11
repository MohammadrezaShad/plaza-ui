import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ChevronRightPaths from './paths/ChevronRight';
import Icon from './types/Icon';

type ChevronRight = typeof Icon;

const ChevronRight = createSvgIcon(
  ChevronRightPaths,
  'ChevronRight',
) as ChevronRight;

export default ChevronRight;
