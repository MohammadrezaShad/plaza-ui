import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import GooglePaths from './paths/Google';
import Icon from './types/Icon';

type Google = typeof Icon;

const Google = createSvgIcon(GooglePaths, 'Google') as Google;

export default Google;
