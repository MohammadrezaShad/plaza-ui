import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TwitterPaths from './paths/Twitter';
import Icon from './types/Icon';

type Twitter = typeof Icon;

const Twitter = createSvgIcon(TwitterPaths, 'Twitter') as Twitter;

export default Twitter;
