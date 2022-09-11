import React, {forwardRef, ReactNode, Ref} from 'react';

import {Component, ReactMouseEvent} from '../../shared';
import * as S from './Container.styled';

export type ContainerProps = {
  children?: ReactNode;
  component?: Component;
};

const Container = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {children, component}: ContainerProps,
    ref: Ref<T>,
  ) => (
    <S.Container as={component} ref={ref as Ref<HTMLDivElement>}>
      {children}
    </S.Container>
  ),
);
Container.displayName = 'Container';

export default Container;
