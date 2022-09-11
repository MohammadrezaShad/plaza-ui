import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import PrintPaths from './paths/Print';
import Icon from './types/Icon';

type Print = typeof Icon;

const Print = createSvgIcon(PrintPaths, 'Print') as Print;

export default Print;
