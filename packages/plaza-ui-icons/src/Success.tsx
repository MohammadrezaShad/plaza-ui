import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SuccessPaths from './paths/Success';
import Icon from './types/Icon';

type Success = typeof Icon;

const Success = createSvgIcon(SuccessPaths, 'Success') as Success;

export default Success;
