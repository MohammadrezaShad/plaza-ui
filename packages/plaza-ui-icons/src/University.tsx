import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import UniversityPaths from './paths/University';
import Icon from './types/Icon';

type University = typeof Icon;

const University = createSvgIcon(UniversityPaths, 'University') as University;

export default University;
