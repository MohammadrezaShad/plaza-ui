import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import Chevron2TopPaths from './paths/Chevron2Top';
import Icon from './types/Icon';

type Chevron2Top = typeof Icon;

const Chevron2Top = createSvgIcon(
  Chevron2TopPaths,
  'Chevron2Top',
) as Chevron2Top;

export default Chevron2Top;
