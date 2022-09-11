import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SharePaths from './paths/Share';
import Icon from './types/Icon';

type Share = typeof Icon;

const Share = createSvgIcon(SharePaths, 'Share') as Share;

export default Share;
