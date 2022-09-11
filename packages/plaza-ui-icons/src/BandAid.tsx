import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BandAidPaths from './paths/BandAid';
import Icon from './types/Icon';

type BandAid = typeof Icon;

const BandAid = createSvgIcon(BandAidPaths, 'BandAid') as BandAid;

export default BandAid;
