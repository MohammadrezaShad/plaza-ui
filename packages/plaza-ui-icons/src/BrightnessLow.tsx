import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BrightnessLowPaths from './paths/BrightnessLow';
import Icon from './types/Icon';

type BrightnessLow = typeof Icon;

const BrightnessLow = createSvgIcon(
  BrightnessLowPaths,
  'BrightnessLow',
) as BrightnessLow;

export default BrightnessLow;
