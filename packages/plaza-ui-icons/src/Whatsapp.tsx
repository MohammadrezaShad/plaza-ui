import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import WhatsappPaths from './paths/Whatsapp';
import Icon from './types/Icon';

type Whatsapp = typeof Icon;

const Whatsapp = createSvgIcon(WhatsappPaths, 'Whatsapp') as Whatsapp;

export default Whatsapp;
