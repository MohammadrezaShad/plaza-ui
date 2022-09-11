import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TemperaturePaths from './paths/Temperature';
import Icon from './types/Icon';

type Temperature = typeof Icon;

const Temperature = createSvgIcon(
  TemperaturePaths,
  'Temperature',
) as Temperature;

export default Temperature;
