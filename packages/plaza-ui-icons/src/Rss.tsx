import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import RssPaths from './paths/Rss';
import Icon from './types/Icon';

type Rss = typeof Icon;

const Rss = createSvgIcon(RssPaths, 'Rss') as Rss;

export default Rss;
