import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LocationPaths from './paths/Location';
import Icon from './types/Icon';

type Location = typeof Icon;

const Location = createSvgIcon(LocationPaths, 'Location') as Location;

export default Location;
