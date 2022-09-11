import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ChannelPaths from './paths/Channel';
import Icon from './types/Icon';

type Channel = typeof Icon;

const Channel = createSvgIcon(ChannelPaths, 'Channel') as Channel;

export default Channel;
