import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ConstructorPaths from './paths/Constructor';
import Icon from './types/Icon';

type Constructor = typeof Icon;

const Constructor = createSvgIcon(
  ConstructorPaths,
  'Constructor',
) as Constructor;

export default Constructor;
