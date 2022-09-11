import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import AmbulancePaths from './paths/Ambulance';
import Icon from './types/Icon';

type Ambulance = typeof Icon;

const Ambulance = createSvgIcon(AmbulancePaths, 'Ambulance') as Ambulance;

export default Ambulance;
