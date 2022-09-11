import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CreditCardPaths from './paths/CreditCard';
import Icon from './types/Icon';

type CreditCard = typeof Icon;

const CreditCard = createSvgIcon(CreditCardPaths, 'CreditCard') as CreditCard;

export default CreditCard;
