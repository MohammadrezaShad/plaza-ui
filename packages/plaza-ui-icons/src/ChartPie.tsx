import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ChartPiePaths from './paths/ChartPie';
import Icon from './types/Icon';

type ChartPie = typeof Icon;

const ChartPie = createSvgIcon(ChartPiePaths, 'ChartPie') as ChartPie;

export default ChartPie;
