import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CheckOutlinedPaths from './paths/CheckOutlined';
import Icon from './types/Icon';

type CheckOutlined = typeof Icon;

const CheckOutlined = createSvgIcon(
  CheckOutlinedPaths,
  'CheckOutlined',
) as CheckOutlined;

export default CheckOutlined;
