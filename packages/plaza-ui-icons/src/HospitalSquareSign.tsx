import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import HospitalSquareSignPaths from './paths/HospitalSquareSign';
import Icon from './types/Icon';

type HospitalSquareSign = typeof Icon;

const HospitalSquareSign = createSvgIcon(
  HospitalSquareSignPaths,
  'HospitalSquareSign',
) as HospitalSquareSign;

export default HospitalSquareSign;
