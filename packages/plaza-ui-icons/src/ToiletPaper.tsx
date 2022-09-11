import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import ToiletPaperPaths from './paths/ToiletPaper';
import Icon from './types/Icon';

type ToiletPaper = typeof Icon;

const ToiletPaper = createSvgIcon(
  ToiletPaperPaths,
  'ToiletPaper',
) as ToiletPaper;

export default ToiletPaper;
