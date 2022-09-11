import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import Chevron2LeftPaths from './paths/Chevron2Left';
import Icon from './types/Icon';

type Chevron2Left = typeof Icon;

const Chevron2Left = createSvgIcon(
  Chevron2LeftPaths,
  'Chevron2Left',
) as Chevron2Left;

export default Chevron2Left;
