import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import AmbulanceAltPaths from './paths/AmbulanceAlt';
import Icon from './types/Icon';

type AmbulanceAlt = typeof Icon;

const AmbulanceAlt = createSvgIcon(
  AmbulanceAltPaths,
  'AmbulanceAlt',
) as AmbulanceAlt;

export default AmbulanceAlt;
