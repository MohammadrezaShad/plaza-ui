import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TelegramAltPaths from './paths/TelegramAlt';
import Icon from './types/Icon';

type TelegramAlt = typeof Icon;

const TelegramAlt = createSvgIcon(
  TelegramAltPaths,
  'TelegramAlt',
) as TelegramAlt;

export default TelegramAlt;
