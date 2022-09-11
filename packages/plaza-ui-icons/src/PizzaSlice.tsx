import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import PizzaSlicePaths from './paths/PizzaSlice';
import Icon from './types/Icon';

type PizzaSlice = typeof Icon;

const PizzaSlice = createSvgIcon(PizzaSlicePaths, 'PizzaSlice') as PizzaSlice;

export default PizzaSlice;
