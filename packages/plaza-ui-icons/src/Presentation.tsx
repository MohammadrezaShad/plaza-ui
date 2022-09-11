import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import PresentationPaths from './paths/Presentation';
import Icon from './types/Icon';

type Presentation = typeof Icon;

const Presentation = createSvgIcon(
  PresentationPaths,
  'Presentation',
) as Presentation;

export default Presentation;
