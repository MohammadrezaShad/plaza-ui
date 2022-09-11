import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ChevronLeftPaths from './paths/ChevronLeft';
import Icon from './types/Icon';

type ChevronLeft = typeof Icon;

const ChevronLeft = createSvgIcon(
  ChevronLeftPaths,
  'ChevronLeft',
) as ChevronLeft;

export default ChevronLeft;
