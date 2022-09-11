import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LocationArrowPaths from './paths/LocationArrow';
import Icon from './types/Icon';

type LocationArrow = typeof Icon;

const LocationArrow = createSvgIcon(
  LocationArrowPaths,
  'LocationArrow',
) as LocationArrow;

export default LocationArrow;
