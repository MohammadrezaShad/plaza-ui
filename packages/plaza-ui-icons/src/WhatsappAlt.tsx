import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import WhatsappAltPaths from './paths/WhatsappAlt';
import Icon from './types/Icon';

type WhatsappAlt = typeof Icon;

const WhatsappAlt = createSvgIcon(
  WhatsappAltPaths,
  'WhatsappAlt',
) as WhatsappAlt;

export default WhatsappAlt;
