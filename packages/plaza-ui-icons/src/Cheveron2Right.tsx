import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import Cheveron2RightPaths from './paths/Cheveron2Right';
import Icon from './types/Icon';

type Cheveron2Right = typeof Icon;

const Cheveron2Right = createSvgIcon(
  Cheveron2RightPaths,
  'Cheveron2Right',
) as Cheveron2Right;

export default Cheveron2Right;
