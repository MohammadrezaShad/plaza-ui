import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LinkPaths from './paths/Link';
import Icon from './types/Icon';

type Link = typeof Icon;

const Link = createSvgIcon(LinkPaths, 'Link') as Link;

export default Link;
