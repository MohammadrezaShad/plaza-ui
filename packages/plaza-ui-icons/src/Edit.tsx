import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import EditPaths from './paths/Edit';
import Icon from './types/Icon';

type Edit = typeof Icon;

const Edit = createSvgIcon(EditPaths, 'Edit') as Edit;

export default Edit;
