import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import InfoPaths from './paths/Info';
import Icon from './types/Icon';

type Info = typeof Icon;

const Info = createSvgIcon(InfoPaths, 'Info') as Info;

export default Info;
