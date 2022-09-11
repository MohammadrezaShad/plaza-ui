import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import FlowerPaths from './paths/Flower';
import Icon from './types/Icon';

type Flower = typeof Icon;

const Flower = createSvgIcon(FlowerPaths, 'Flower') as Flower;

export default Flower;
