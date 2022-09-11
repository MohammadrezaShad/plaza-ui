import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ArchivePaths from './paths/Archive';
import Icon from './types/Icon';

type Archive = typeof Icon;

const Archive = createSvgIcon(ArchivePaths, 'Archive') as Archive;

export default Archive;
