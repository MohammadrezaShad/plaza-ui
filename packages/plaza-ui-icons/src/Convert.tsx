import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ConvertPaths from './paths/Convert';
import Icon from './types/Icon';

type Convert = typeof Icon;

const Convert = createSvgIcon(ConvertPaths, 'Convert') as Convert;

export default Convert;
