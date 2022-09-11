import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SyncPaths from './paths/Sync';
import Icon from './types/Icon';

type Sync = typeof Icon;

const Sync = createSvgIcon(SyncPaths, 'Sync') as Sync;

export default Sync;
