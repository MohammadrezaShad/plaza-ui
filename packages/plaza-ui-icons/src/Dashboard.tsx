import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import DashboardPaths from './paths/Dashboard';
import Icon from './types/Icon';

type Dashboard = typeof Icon;

const Dashboard = createSvgIcon(DashboardPaths, 'Dashboard') as Dashboard;

export default Dashboard;
