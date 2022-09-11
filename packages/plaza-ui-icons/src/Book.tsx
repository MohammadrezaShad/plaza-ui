import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import BookPaths from './paths/Book';
import Icon from './types/Icon';

type Book = typeof Icon;

const Book = createSvgIcon(BookPaths, 'Book') as Book;

export default Book;
