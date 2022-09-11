import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MailboxPaths from './paths/Mailbox';
import Icon from './types/Icon';

type Mailbox = typeof Icon;

const Mailbox = createSvgIcon(MailboxPaths, 'Mailbox') as Mailbox;

export default Mailbox;
