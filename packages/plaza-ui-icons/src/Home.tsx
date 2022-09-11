import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import HomePaths from './paths/Home';
import Icon from './types/Icon';

type Home = typeof Icon;

const Home = createSvgIcon(HomePaths, 'Home') as Home;

export default Home;
