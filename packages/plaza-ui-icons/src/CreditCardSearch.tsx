import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CreditCardSearchPaths from './paths/CreditCardSearch';
import Icon from './types/Icon';

type CreditCardSearch = typeof Icon;

const CreditCardSearch = createSvgIcon(
  CreditCardSearchPaths,
  'CreditCardSearch',
) as CreditCardSearch;

export default CreditCardSearch;
