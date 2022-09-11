import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import SearchMinusPaths from './paths/SearchMinus';
import Icon from './types/Icon';

type SearchMinus = typeof Icon;

const SearchMinus = createSvgIcon(
  SearchMinusPaths,
  'SearchMinus',
) as SearchMinus;

export default SearchMinus;
