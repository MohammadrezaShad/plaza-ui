import {noop} from '@plaza-ui/utils/lib/main';
import React, {
  forwardRef,
  LegacyRef,
  Ref,
  useContext,
  useImperativeHandle,
  useRef,
} from 'react';
import {CSSTransition} from 'react-transition-group';
import {ThemeContext} from 'styled-components';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import {TransitionProps} from '../../shared';
import * as S from './Collapse.styled';

export type CollapseOrientation = 'horizontal' | 'vertical';

interface CollapseProps extends TransitionProps {
  orientation?: CollapseOrientation;
  collapseSize?: number;
  sx?: SxType;
}

const Collapse = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      in: inProp,
      transition = {enter: 500, exit: 500},
      unmountOnExit = true,
      mountOnEnter = true,
      appear = true,
      component,
      collapseSize,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExited,
      onExiting,
      orientation = 'vertical',
      sx,
      ...restProps
    }: CollapseProps,
    ref: Ref<T>,
  ) => {
    const nodeRef = useRef(null);
    const wrapRef = useRef<T>(null);
    const {pxToRem} = useContext(ThemeContext);
    const sxStyles = useSxProp(sx);
    useImperativeHandle(ref, () => wrapRef as unknown as T);

    const isHorizontal = orientation === 'horizontal';
    const size = isHorizontal ? 'width' : 'height';

    const getWrapperSize = () =>
      wrapRef.current
        ? wrapRef.current[isHorizontal ? 'scrollWidth' : 'scrollHeight']
        : 0;

    const handleEnter = (node: HTMLElement, isAppearing?: boolean) => {
      if (wrapRef && wrapRef.current) {
        if (isAppearing) {
          wrapRef.current.style.transitionDuration = `0ms`;
        } else {
          wrapRef.current.style.transitionDuration = `${transition.enter}ms`;
        }
        wrapRef.current.style[size] = `${pxToRem(0)}`;
      }
      onEnter?.(node, isAppearing);
    };
    const handleEntered = (node: HTMLElement, isAppearing?: boolean) => {
      if (wrapRef && wrapRef.current) {
        wrapRef.current.style[size] = 'auto';
      }
      onEntered?.(node, isAppearing);
    };
    const handleEntering = (node: HTMLElement, isAppearing?: boolean) => {
      if (wrapRef && wrapRef.current) {
        wrapRef.current.style[size] = `${pxToRem(getWrapperSize())}`;
      }
      onEntering?.(node, isAppearing);
    };
    const handleExit = (node: HTMLElement, isAppearing?: boolean) => {
      if (wrapRef && wrapRef.current) {
        wrapRef.current.style.transitionDuration = `${transition.exit}ms`;
        wrapRef.current.style[size] = `${pxToRem(getWrapperSize())}`;
      }
      onExit?.(node, isAppearing);
    };
    const handleExited = (node: HTMLElement, isAppearing?: boolean) => {
      onExited?.(node, isAppearing);
    };
    const handleExiting = (node: HTMLElement, isAppearing?: boolean) => {
      if (wrapRef && wrapRef.current) {
        wrapRef.current.style[size] = `${0}px`;
      }
      onExiting?.(node, isAppearing);
    };

    return (
      <CSSTransition
        onEnter={handleEnter}
        onEntered={handleEntered}
        onEntering={handleEntering}
        onExit={handleExit}
        onExited={handleExited}
        onExiting={handleExiting}
        in={inProp}
        timeout={transition}
        classNames="collapse"
        addEndListener={noop}
        appear={appear}
        unmountOnExit={unmountOnExit}
        mountOnEnter={mountOnEnter}
        ref={
          nodeRef as unknown as
            | LegacyRef<CSSTransition<HTMLElement | undefined>>
            | undefined
        }
      >
        <S.Wrap
          as={component}
          ref={wrapRef}
          sx={sxStyles}
          $size={size}
          $collapseSize={collapseSize}
          $transition={transition}
          $isOpen={inProp}
          {...restProps}
        >
          {children}
        </S.Wrap>
      </CSSTransition>
    );
  },
);

Collapse.displayName = 'Collapse';

export default Collapse;
