import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import FlaskPaths from './paths/Flask';
import Icon from './types/Icon';

type Flask = typeof Icon;

const Flask = createSvgIcon(FlaskPaths, 'Flask') as Flask;

export default Flask;
