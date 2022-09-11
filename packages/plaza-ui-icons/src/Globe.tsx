import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import GlobePaths from './paths/Globe';
import Icon from './types/Icon';

type Globe = typeof Icon;

const Globe = createSvgIcon(GlobePaths, 'Globe') as Globe;

export default Globe;
