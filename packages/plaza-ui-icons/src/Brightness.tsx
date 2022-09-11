import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BrightnessPaths from './paths/Brightness';
import Icon from './types/Icon';

type Brightness = typeof Icon;

const Brightness = createSvgIcon(BrightnessPaths, 'Brightness') as Brightness;

export default Brightness;
