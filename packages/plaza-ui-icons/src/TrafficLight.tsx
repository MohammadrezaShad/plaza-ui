import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TrafficLightPaths from './paths/TrafficLight';
import Icon from './types/Icon';

type TrafficLight = typeof Icon;

const TrafficLight = createSvgIcon(
  TrafficLightPaths,
  'TrafficLight',
) as TrafficLight;

export default TrafficLight;
