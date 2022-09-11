import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SearchPlusPaths from './paths/SearchPlus';
import Icon from './types/Icon';

type SearchPlus = typeof Icon;

const SearchPlus = createSvgIcon(SearchPlusPaths, 'SearchPlus') as SearchPlus;

export default SearchPlus;
