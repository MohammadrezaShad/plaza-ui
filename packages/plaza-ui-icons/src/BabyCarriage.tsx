import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BabyCarriagePaths from './paths/BabyCarriage';
import Icon from './types/Icon';

type BabyCarriage = typeof Icon;

const BabyCarriage = createSvgIcon(
  BabyCarriagePaths,
  'BabyCarriage',
) as BabyCarriage;

export default BabyCarriage;
