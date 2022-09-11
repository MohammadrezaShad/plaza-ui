import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TreesPaths from './paths/Trees';
import Icon from './types/Icon';

type Trees = typeof Icon;

const Trees = createSvgIcon(TreesPaths, 'Trees') as Trees;

export default Trees;
