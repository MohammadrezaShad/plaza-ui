import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MetroPaths from './paths/Metro';
import Icon from './types/Icon';

type Metro = typeof Icon;

const Metro = createSvgIcon(MetroPaths, 'Metro') as Metro;

export default Metro;
