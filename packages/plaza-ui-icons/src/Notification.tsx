import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import NotificationPaths from './paths/Notification';
import Icon from './types/Icon';

type Notification = typeof Icon;

const Notification = createSvgIcon(
  NotificationPaths,
  'Notification',
) as Notification;

export default Notification;
