import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ComparePaths from './paths/Compare';
import Icon from './types/Icon';

type Compare = typeof Icon;

const Compare = createSvgIcon(ComparePaths, 'Compare') as Compare;

export default Compare;
