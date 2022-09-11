/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

import {noop} from '@plaza-ui/utils/lib/main';
import React, {forwardRef, Ref, useImperativeHandle, useRef} from 'react';
import {Transition} from 'react-transition-group';

import {TransitionProps} from '../../shared';

interface FadeProps extends TransitionProps {
  transitionDelay?: TransitionProps['transition'];
}

const styles = {
  entering: {
    opacity: 1,
  },
  entered: {
    opacity: 1,
  },
};

const Fade = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      in: inProp,
      transition = {enter: 500, exit: 300},
      transitionDelay = {enter: 0, exit: 0},
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
    }: FadeProps,
    ref: Ref<T>,
  ) => {
    const nodeRef = useRef(null);
    const childrenRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => ref as unknown as T);

    const handleEnter = (node: HTMLElement, isAppearing?: boolean) => {
      reflow(node); // So the animation always start from the start.
      node.style.webkitTransition = ` ${transition.enter}ms opacity ${transitionDelay?.enter}ms`;
      node.style.transition = `${transition.enter}ms opacity ${transitionDelay?.enter}ms`;
      onEnter?.(node, isAppearing);
    };

    const handleEntered = (node: HTMLElement, isAppearing?: boolean) => {
      onEntered?.(node, isAppearing);
    };

    const handleEntering = (node: HTMLElement, isAppearing?: boolean) => {
      onEntering?.(node, isAppearing);
    };
    const handleExit = (node: HTMLElement, isAppearing?: boolean) => {
      node.style.webkitTransition = `${transition.exit}ms opacity ${transitionDelay?.exit}ms`;
      node.style.transition = ` ${transition.exit}ms opacity ${transitionDelay?.exit}ms`;
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
      >
        {(state: any, childProps: React.Attributes) =>
          React.isValidElement(children)
            ? React.cloneElement(children, {
                ref: nodeRef,
                style: {
                  opacity: 0,
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

Fade.displayName = 'Fade';

export default Fade;

export const reflow = (node: Element) => node.scrollTop;
