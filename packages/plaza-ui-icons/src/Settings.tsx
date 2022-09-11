import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SettingsPaths from './paths/Settings';
import Icon from './types/Icon';

type Settings = typeof Icon;

const Settings = createSvgIcon(SettingsPaths, 'Settings') as Settings;

export default Settings;
