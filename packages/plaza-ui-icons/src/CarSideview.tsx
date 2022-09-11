import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CarSideviewPaths from './paths/CarSideview';
import Icon from './types/Icon';

type CarSideview = typeof Icon;

const CarSideview = createSvgIcon(
  CarSideviewPaths,
  'CarSideview',
) as CarSideview;

export default CarSideview;
