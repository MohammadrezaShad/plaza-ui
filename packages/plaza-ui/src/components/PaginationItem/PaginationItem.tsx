import React, {ElementType, forwardRef, Fragment, Ref} from 'react';

import {ReactMouseEvent} from '../../shared';
import Button from '../Button';
import {PaginationItemProps} from '../Pagination/Pagination.types';
import * as S from './PaginationItem.styled';

const PaginationItem = forwardRef<HTMLDivElement, PaginationItemProps>(
  (props, ref) => {
    const {
      color = 'standard',
      component,
      disabled = false,
      page,
      selected = false,
      shape = 'circular',
      size = 'medium',
      variant = 'outlined',
      type = 'page',
      hideNextButton,
      hidePrevButton,
      onClick,
      sx,
    } = props;

    return (
      <>
        {type === 'start-ellipsis' || type === 'end-ellipsis' ? (
          <Button
            size={size}
            disabled={disabled}
            variant={variant}
            component={component || S.PaginationItem}
            hasDefaultCursor
            hasHover={false}
            sx={sx}
          >
            ...
          </Button>
        ) : (
          <Button
            component={
              type === 'previous' || type === 'next'
                ? undefined
                : component || S.PaginationItem
            }
            sx={sx}
            size={size}
            disabled={disabled}
            variant={selected ? 'contained' : variant}
            color={selected ? 'secondary' : 'primary'}
            hasHover={false}
            ref={ref as Ref<HTMLButtonElement>}
            onClick={onClick}
          >
            {type === 'page' && page}
            {type === 'previous' && 'قبلی'}
            {type === 'next' && 'بعدی'}
          </Button>
        )}
      </>
    );
  },
);
PaginationItem.displayName = 'PaginationItem';
export default PaginationItem;
