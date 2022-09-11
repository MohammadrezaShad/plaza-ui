import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SpecialStarPaths from './paths/SpecialStar';
import Icon from './types/Icon';

type SpecialStar = typeof Icon;

const SpecialStar = createSvgIcon(
  SpecialStarPaths,
  'SpecialStar',
) as SpecialStar;

export default SpecialStar;
