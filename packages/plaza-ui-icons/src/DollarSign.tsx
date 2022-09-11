import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import DollarSignPaths from './paths/DollarSign';
import Icon from './types/Icon';

type DollarSign = typeof Icon;

const DollarSign = createSvgIcon(DollarSignPaths, 'DollarSign') as DollarSign;

export default DollarSign;
