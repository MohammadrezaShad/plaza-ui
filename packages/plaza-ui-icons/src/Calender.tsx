import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CalenderPaths from './paths/Calender';
import Icon from './types/Icon';

type Calender = typeof Icon;

const Calender = createSvgIcon(CalenderPaths, 'Calender') as Calender;

export default Calender;
