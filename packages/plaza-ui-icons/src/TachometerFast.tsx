import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TachometerFastPaths from './paths/TachometerFast';
import Icon from './types/Icon';

type TachometerFast = typeof Icon;

const TachometerFast = createSvgIcon(
  TachometerFastPaths,
  'TachometerFast',
) as TachometerFast;

export default TachometerFast;
