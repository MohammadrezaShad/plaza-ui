import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import MenuPaths from './paths/Menu';
import Icon from './types/Icon';

type Menu = typeof Icon;

const Menu = createSvgIcon(MenuPaths, 'Menu') as Menu;

export default Menu;
