import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TagPaths from './paths/Tag';
import Icon from './types/Icon';

type Tag = typeof Icon;

const Tag = createSvgIcon(TagPaths, 'Tag') as Tag;

export default Tag;
