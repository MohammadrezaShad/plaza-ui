/* eslint-disable no-param-reassign */
import useIsomorphicLayoutEffect from '@plaza-ui/hooks/lib/useIsomorphicLayoutEffect';
import {debounce} from '@plaza-ui/utils/lib/debounce';
import {noop} from '@plaza-ui/utils/lib/main';
import React, {forwardRef, Ref, useImperativeHandle, useRef} from 'react';
import {Transition} from 'react-transition-group';

import {TransitionProps} from '../../shared';

export type SlideDirection = 'down' | 'left' | 'right' | 'up';

interface SlideProps extends TransitionProps {
  direction?: SlideDirection;
}

const Slide = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    {
      children,
      in: inProp,
      transition = {enter: 500, exit: 300},
      unmountOnExit = true,
      mountOnEnter = true,
      appear = true,
      direction = 'up',
      style,
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExited,
      onExiting,
    }: SlideProps,
    ref: Ref<T>,
  ) => {
    const nodeRef = useRef(null);
    const childrenRef = useRef<HTMLElement>(null);
    useImperativeHandle(ref, () => ref as unknown as T);

    const handleEnter = (node: HTMLElement, isAppearing?: boolean) => {
      setTranslateValue(direction, childrenRef.current as HTMLElement);
      reflow(childrenRef.current as HTMLElement);
      onEnter?.(node, isAppearing);
    };

    const handleEntered = (node: HTMLElement, isAppearing?: boolean) => {
      onEntered?.(node, isAppearing);
    };

    const handleEntering = (node: HTMLElement, isAppearing?: boolean) => {
      node.style.transition = `transform ${transition.enter}ms`;
      node.style.webkitTransform = 'none';
      node.style.transform = 'none';

      onEntering?.(node, isAppearing);
    };
    const handleExit = (node: HTMLElement, isAppearing?: boolean) => {
      node.style.transition = `transform ${transition.exit}ms`;
      setTranslateValue(direction, childrenRef.current as HTMLElement);
      onExit?.(node, isAppearing);
    };

    const handleExited = (node: HTMLElement, isAppearing?: boolean) => {
      node.style.webkitTransition = '';
      node.style.transition = '';
      onExited?.(node, isAppearing);
    };

    const handleExiting = (node: HTMLElement, isAppearing?: boolean) => {
      onExiting?.(node, isAppearing);
    };

    const updatePosition = React.useCallback(() => {
      if (childrenRef.current) {
        setTranslateValue(direction, childrenRef.current);
      }
    }, [direction]);

    useIsomorphicLayoutEffect(() => {
      if (!inProp) {
        updatePosition();
      }
    }, [inProp, updatePosition]);

    React.useEffect(() => {
      // Skip configuration where the position is screen size invariant.
      if (inProp || direction === 'down' || direction === 'right') {
        return undefined;
      }

      const handleResize = debounce(() => {
        if (childrenRef.current) {
          setTranslateValue(direction, childrenRef.current);
        }
      });

      const containerWindow = window;
      containerWindow.addEventListener('resize', handleResize);
      return () => {
        handleResize.clear();
        containerWindow.removeEventListener('resize', handleResize);
      };
    }, [direction, inProp]);

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
        {(state: unknown, childProps: React.Attributes) =>
          React.isValidElement(children)
            ? React.cloneElement(children, {
                ref: childrenRef,
                style: {
                  visibility:
                    state === 'exited' && !inProp ? 'hidden' : undefined,
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

Slide.displayName = 'Slide';

export default Slide;

function getTranslateValue(direction: SlideDirection, node: HTMLElement) {
  const rect = node.getBoundingClientRect();
  const containerWindow = window;

  const computedStyle = containerWindow.getComputedStyle(node);
  const transform =
    computedStyle.getPropertyValue('-webkit-transform') ||
    computedStyle.getPropertyValue('transform');

  let offsetX = 0;
  let offsetY = 0;

  if (transform && transform !== 'none' && typeof transform === 'string') {
    const transformValues = transform.split('(')[1].split(')')[0].split(',');
    offsetX = parseInt(transformValues[4], 10);
    offsetY = parseInt(transformValues[5], 10);
  }

  if (direction === 'left') {
    return `translateX(${containerWindow.innerWidth + offsetX - rect.left}px)`;
  }

  if (direction === 'right') {
    return `translateX(-${rect.left + rect.width - offsetX}px)`;
  }

  if (direction === 'up') {
    return `translateY(${containerWindow.innerHeight + offsetY - rect.top}px)`;
  }

  // direction === 'down'

  return `translateY(-${rect.top + rect.height - offsetY}px)`;
}

export const reflow = (node: Element) => node.scrollTop;

export function setTranslateValue(
  direction: SlideDirection,
  node: HTMLElement,
) {
  const transform = getTranslateValue(direction, node);

  if (transform) {
    node.style.webkitTransform = transform;
    node.style.transform = transform;
  }
}
