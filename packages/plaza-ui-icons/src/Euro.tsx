import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import EuroPaths from './paths/Euro';
import Icon from './types/Icon';

type Euro = typeof Icon;

const Euro = createSvgIcon(EuroPaths, 'Euro') as Euro;

export default Euro;
