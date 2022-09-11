import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import NewspaperPaths from './paths/Newspaper';
import Icon from './types/Icon';

type Newspaper = typeof Icon;

const Newspaper = createSvgIcon(NewspaperPaths, 'Newspaper') as Newspaper;

export default Newspaper;
