import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ChevronTopPaths from './paths/ChevronTop';
import Icon from './types/Icon';

type ChevronTop = typeof Icon;

const ChevronTop = createSvgIcon(ChevronTopPaths, 'ChevronTop') as ChevronTop;

export default ChevronTop;
