import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ArchwayPaths from './paths/Archway';
import Icon from './types/Icon';

type Archway = typeof Icon;

const Archway = createSvgIcon(ArchwayPaths, 'Archway') as Archway;

export default Archway;
