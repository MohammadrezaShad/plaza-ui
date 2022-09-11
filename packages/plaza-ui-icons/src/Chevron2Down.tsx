import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import Chevron2DownPaths from './paths/Chevron2Down';
import Icon from './types/Icon';

type Chevron2Down = typeof Icon;

const Chevron2Down = createSvgIcon(
  Chevron2DownPaths,
  'Chevron2Down',
) as Chevron2Down;

export default Chevron2Down;
