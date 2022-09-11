import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ImagePaths from './paths/Image';
import Icon from './types/Icon';

type Image = typeof Icon;

const Image = createSvgIcon(ImagePaths, 'Image') as Image;

export default Image;
