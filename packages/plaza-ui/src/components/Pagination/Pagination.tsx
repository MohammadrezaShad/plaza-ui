import React, {forwardRef} from 'react';

import {usePagination} from '../../hooks/usePagination';
import useSxProp, {SxType} from '../../hooks/useSxProp';
import PaginationItem from '../PaginationItem';
import * as S from './Pagination.styled';
import {PaginationProps} from './Pagination.types';

const Pagination = forwardRef<HTMLDivElement, PaginationProps>((props, ref) => {
  const {
    color = 'standard',
    size = 'medium',
    shape = 'rounded',
    variant = 'outlined',
    count = 1,
    defaultPage = 1,
    siblingCount = 1,
    boundaryCount = 3,
    disabled = false,
    showFirstButton = false,
    showLastButton = false,
    page,
    sx,
    renderItem = item => <PaginationItem {...item} />,
    onChange,
  } = props;
  const {items} = usePagination({...props, componentName: 'Pagination'});
  const sxStyles = useSxProp(sx);
  return (
    <S.Pagination ref={ref} sx={sxStyles}>
      <S.PaginationList>
        {items.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <S.PaginationItem key={index}>
            {renderItem({
              ...item,
              color,
              shape,
              size,
              variant,
            })}
          </S.PaginationItem>
        ))}
      </S.PaginationList>
    </S.Pagination>
  );
});

Pagination.displayName = 'Pagination';

export default Pagination;
