import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MapPaths from './paths/Map';
import Icon from './types/Icon';

type Map = typeof Icon;

const Map = createSvgIcon(MapPaths, 'Map') as Map;

export default Map;
