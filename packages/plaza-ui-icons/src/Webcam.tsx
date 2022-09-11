import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import WebcamPaths from './paths/Webcam';
import Icon from './types/Icon';

type Webcam = typeof Icon;

const Webcam = createSvgIcon(WebcamPaths, 'Webcam') as Webcam;

export default Webcam;
