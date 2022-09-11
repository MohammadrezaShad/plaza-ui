import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import PaypalPaths from './paths/Paypal';
import Icon from './types/Icon';

type Paypal = typeof Icon;

const Paypal = createSvgIcon(PaypalPaths, 'Paypal') as Paypal;

export default Paypal;
