import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import DenyOutlinedPaths from './paths/DenyOutlined';
import Icon from './types/Icon';

type DenyOutlined = typeof Icon;

const DenyOutlined = createSvgIcon(
  DenyOutlinedPaths,
  'DenyOutlined',
) as DenyOutlined;

export default DenyOutlined;
