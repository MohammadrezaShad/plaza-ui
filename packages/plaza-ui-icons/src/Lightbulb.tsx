import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LightbulbPaths from './paths/Lightbulb';
import Icon from './types/Icon';

type Lightbulb = typeof Icon;

const Lightbulb = createSvgIcon(LightbulbPaths, 'Lightbulb') as Lightbulb;

export default Lightbulb;
