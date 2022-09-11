import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import GuaranteePaths from './paths/Guarantee';
import Icon from './types/Icon';

type Guarantee = typeof Icon;

const Guarantee = createSvgIcon(GuaranteePaths, 'Guarantee') as Guarantee;

export default Guarantee;
