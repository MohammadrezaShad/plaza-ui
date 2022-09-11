import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import GraduationCapPaths from './paths/GraduationCap';
import Icon from './types/Icon';

type GraduationCap = typeof Icon;

const GraduationCap = createSvgIcon(
  GraduationCapPaths,
  'GraduationCap',
) as GraduationCap;

export default GraduationCap;
