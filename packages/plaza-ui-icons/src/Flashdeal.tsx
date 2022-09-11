import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import FlashdealPaths from './paths/Flashdeal';
import Icon from './types/Icon';

type Flashdeal = typeof Icon;

const Flashdeal = createSvgIcon(FlashdealPaths, 'Flashdeal') as Flashdeal;

export default Flashdeal;
