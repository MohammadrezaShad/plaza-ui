import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import LinkedinAltPaths from './paths/LinkedinAlt';
import Icon from './types/Icon';

type LinkedinAlt = typeof Icon;

const LinkedinAlt = createSvgIcon(
  LinkedinAltPaths,
  'LinkedinAlt',
) as LinkedinAlt;

export default LinkedinAlt;
