import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import PersonPaths from './paths/Person';
import Icon from './types/Icon';

type Person = typeof Icon;

const Person = createSvgIcon(PersonPaths, 'Person') as Person;

export default Person;
