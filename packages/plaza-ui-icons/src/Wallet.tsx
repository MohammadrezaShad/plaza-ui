import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import WalletPaths from './paths/Wallet';
import Icon from './types/Icon';

type Wallet = typeof Icon;

const Wallet = createSvgIcon(WalletPaths, 'Wallet') as Wallet;

export default Wallet;
