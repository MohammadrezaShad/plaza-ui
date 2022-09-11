import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import InstagramAltPaths from './paths/InstagramAlt';
import Icon from './types/Icon';

type InstagramAlt = typeof Icon;

const InstagramAlt = createSvgIcon(
  InstagramAltPaths,
  'InstagramAlt',
) as InstagramAlt;

export default InstagramAlt;
