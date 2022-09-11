import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import TrashPaths from './paths/Trash';
import Icon from './types/Icon';

type Trash = typeof Icon;

const Trash = createSvgIcon(TrashPaths, 'Trash') as Trash;

export default Trash;
