import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SearchPaths from './paths/Search';
import Icon from './types/Icon';

type Search = typeof Icon;

const Search = createSvgIcon(SearchPaths, 'Search') as Search;

export default Search;
