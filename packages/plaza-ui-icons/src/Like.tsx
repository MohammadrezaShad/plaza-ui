import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LikePaths from './paths/Like';
import Icon from './types/Icon';

type Like = typeof Icon;

const Like = createSvgIcon(LikePaths, 'Like') as Like;

export default Like;
