import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LaptopPaths from './paths/Laptop';
import Icon from './types/Icon';

type Laptop = typeof Icon;

const Laptop = createSvgIcon(LaptopPaths, 'Laptop') as Laptop;

export default Laptop;
