import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LocationPointPaths from './paths/LocationPoint';
import Icon from './types/Icon';

type LocationPoint = typeof Icon;

const LocationPoint = createSvgIcon(
  LocationPointPaths,
  'LocationPoint',
) as LocationPoint;

export default LocationPoint;
