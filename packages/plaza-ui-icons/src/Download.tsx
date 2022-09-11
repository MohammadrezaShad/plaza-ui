import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import DownloadPaths from './paths/Download';
import Icon from './types/Icon';

type DenyOutlined = typeof Icon;

const Download = createSvgIcon(DownloadPaths, 'Download') as DenyOutlined;

export default Download;
