import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import EnvelopePaths from './paths/Envelope';
import Icon from './types/Icon';

type Envelope = typeof Icon;

const Envelope = createSvgIcon(EnvelopePaths, 'Envelope') as Envelope;

export default Envelope;
