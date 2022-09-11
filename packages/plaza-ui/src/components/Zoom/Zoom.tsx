/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import {noop} from '@plaza-ui/utils/lib/main';
import React, {forwardRef, Ref, useImperativeHandle, useRef} from 'react';
import {Transition} from 'react-transition-group';

import {TransitionProps} from '../../shared';

type ZoomProps = TransitionProps;

const styles = {
  entering: {
    transform: 'none',
  },
  entered: {
    transform: 'none',
  },
};

const Zoom = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      in: inProp,
      transition = {enter: 500, exit: 300},
      unmountOnExit = true,
      mountOnEnter = true,
      appear = true,
      style,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExited,
      onExiting,
      ...restProps
    }: ZoomProps,
    ref: Ref<T>,
  ) => {
    const nodeRef = useRef(null);
    const childrenRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => ref as unknown as T);

    const handleEnter = (node: HTMLElement, isAppearing?: boolean) => {
      reflow(node); // So the animation always start from the start.
      node.style.webkitTransition = `transform ${transition.enter}ms`;
      node.style.transition = `transform ${transition.enter}ms`;
      onEnter?.(node, isAppearing);
    };

    const handleEntered = (node: HTMLElement, isAppearing?: boolean) => {
      onEntered?.(node, isAppearing);
    };

    const handleEntering = (node: HTMLElement, isAppearing?: boolean) => {
      node.style.webkitTransition = `transform ${transition.enter}ms`;
      node.style.transition = `transform ${transition.enter}ms`;
      node.style.webkitTransform = 'none';
      node.style.transform = 'none';

      onEntering?.(node, isAppearing);
    };
    const handleExit = (node: HTMLElement, isAppearing?: boolean) => {
      node.style.webkitTransition = `transform ${transition.exit}ms`;
      node.style.transition = `transform ${transition.exit}ms`;
      onExit?.(node, isAppearing);
    };

    const handleExited = (node: HTMLElement, isAppearing?: boolean) => {
      onExited?.(node, isAppearing);
    };

    const handleExiting = (node: HTMLElement, isAppearing?: boolean) => {
      onExiting?.(node, isAppearing);
    };

    return (
      <Transition
        onEnter={handleEnter}
        onEntered={handleEntered}
        onEntering={handleEntering}
        onExit={handleExit}
        onExited={handleExited}
        onExiting={handleExiting}
        in={inProp}
        timeout={transition}
        addEndListener={noop}
        appear={appear}
        unmountOnExit={unmountOnExit}
        mountOnEnter={mountOnEnter}
        ref={nodeRef}
        {...restProps}
      >
        {(state: any, childProps: React.Attributes) =>
          React.isValidElement(children)
            ? React.cloneElement(children, {
                ref: childrenRef,
                style: {
                  transform: 'scale(0)',
                  visibility:
                    state === 'exited' && !inProp ? 'hidden' : undefined,
                  ...(styles as any)[state],
                  ...style,
                  ...children.props.style,
                },
                ...childProps,
              })
            : null
        }
      </Transition>
    );
  },
);

Zoom.displayName = 'Zoom';

export default Zoom;

export const reflow = (node: Element) => node.scrollTop;
