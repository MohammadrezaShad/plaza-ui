import {createSvgIcon} from '@plaza-ui/core/lib/utils/createSvgIcon';

import CommentPaths from './paths/Comment';
import Icon from './types/Icon';

type Comment = typeof Icon;

const Comment = createSvgIcon(CommentPaths, 'Comment') as Comment;

export default Comment;
