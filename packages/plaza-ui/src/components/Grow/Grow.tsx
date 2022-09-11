/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import {noop} from '@plaza-ui/utils/lib/main';
import React, {forwardRef, Ref, useImperativeHandle, useRef} from 'react';
import {Transition} from 'react-transition-group';

import {TransitionProps} from '../../shared';

type GrowProps = TransitionProps;

function getScale(value: number) {
  return `scale(${value}, ${value ** 2})`;
}

const styles = {
  entering: {
    opacity: 1,
    transform: getScale(1),
  },
  entered: {
    opacity: 1,
    transform: 'none',
  },
};

const Grow = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      in: inProp,
      transition = {enter: 500, exit: 500},
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
    }: GrowProps,
    ref: Ref<T>,
  ) => {
    const nodeRef = useRef(null);
    const childrenRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => ref as unknown as T);

    const handleEnter = (node: HTMLElement, isAppearing?: boolean) => {
      reflow(node); // So the animation always start from the start.
      node.style.webkitTransition = `opacity ${transition.enter}ms,transform ${
        transition.enter * 0.666
      }ms`;
      node.style.transition = `opacity ${transition.enter}ms,transform ${
        transition.enter * 0.666
      }ms`;
      onEnter?.(node, isAppearing);
    };

    const handleEntered = (node: HTMLElement, isAppearing?: boolean) => {
      onEntered?.(node, isAppearing);
    };

    const handleEntering = (node: HTMLElement, isAppearing?: boolean) => {
      onEntering?.(node, isAppearing);
    };
    const handleExit = (node: HTMLElement, isAppearing?: boolean) => {
      node.style.webkitTransition = `opacity ${transition.exit}ms,${
        transition.exit * 0.666
      }ms transform ${transition.exit * 0.333}ms`;

      node.style.transition = `opacity ${transition.exit}ms,${
        transition.exit * 0.666
      }ms transform ${transition.exit * 0.333}ms`;

      node.style.opacity = '0';
      node.style.transform = getScale(0.75);
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
                  opacity: 0,
                  transform: getScale(0.75),
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

Grow.displayName = 'Grow';

export default Grow;

export const reflow = (node: Element) => node.scrollTop;
