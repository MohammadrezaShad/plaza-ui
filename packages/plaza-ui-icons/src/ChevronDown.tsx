import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ChevronDownPaths from './paths/ChevronDown';
import Icon from './types/Icon';

type ChevronDown = typeof Icon;

const ChevronDown = createSvgIcon(
  ChevronDownPaths,
  'ChevronDown',
) as ChevronDown;

export default ChevronDown;
