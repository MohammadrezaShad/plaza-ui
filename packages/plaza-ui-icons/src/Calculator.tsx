import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CalculatorPaths from './paths/Calculator';
import Icon from './types/Icon';

type Calculator = typeof Icon;

const Calculator = createSvgIcon(CalculatorPaths, 'Calculator') as Calculator;

export default Calculator;
