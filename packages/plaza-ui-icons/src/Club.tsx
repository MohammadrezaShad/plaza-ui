import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ClubPaths from './paths/Club';
import Icon from './types/Icon';

type Off = typeof Icon;

const Club = createSvgIcon(ClubPaths, 'Club') as Off;

export default Club;
