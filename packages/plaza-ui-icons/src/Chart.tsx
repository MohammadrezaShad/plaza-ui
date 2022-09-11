import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ChartPaths from './paths/Chart';
import Icon from './types/Icon';

type Chart = typeof Icon;

const Chart = createSvgIcon(ChartPaths, 'Chart') as Chart;

export default Chart;
