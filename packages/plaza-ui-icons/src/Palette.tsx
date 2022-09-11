import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import PalettePaths from './paths/Palette';
import Icon from './types/Icon';

type Palette = typeof Icon;

const Palette = createSvgIcon(PalettePaths, 'Palette') as Palette;

export default Palette;
