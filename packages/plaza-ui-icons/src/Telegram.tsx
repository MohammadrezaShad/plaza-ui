import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TelegramPaths from './paths/Telegram';
import Icon from './types/Icon';

type Telegram = typeof Icon;

const Telegram = createSvgIcon(TelegramPaths, 'Telegram') as Telegram;

export default Telegram;
