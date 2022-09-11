import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import PaymentPaths from './paths/Payment';
import Icon from './types/Icon';

type Payment = typeof Icon;

const Payment = createSvgIcon(PaymentPaths, 'Payment') as Payment;

export default Payment;
