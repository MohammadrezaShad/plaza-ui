import React, {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

import * as S from './Popover.styled';
import {
  ContentLocation,
  ContentLocationGetter,
  PopoverPosition,
  PopoverProps,
  PopoverState,
} from './Popover.types';
import {PopoverPortal} from './PopoverPortal';
import {useMemoizedArray} from './useMemoizedArray';
import {usePopover} from './usePopover';
import {Constants, rectsAreEqual} from './util';

export {useArrowContainer} from './useArrowContainer';
export {ArrowContainer} from './ArrowContainer';
export {usePopover};

const PopoverInternal = forwardRef<HTMLElement, PopoverProps>(
  (
    {
      isOpen,
      children,
      content,
      positions: externalPositions = Constants.DEFAULT_POSITIONS,
      align = Constants.DEFAULT_ALIGN,
      padding = 0,
      reposition = true,
      parentElement = window.document.body,
      boundaryElement = parentElement,
      containerClassName = 'plaza-ui-popover-container',
      containerStyle,
      contentLocation,
      boundaryInset = 0,
      onClickOutside,
    },
    externalRef,
  ) => {
    const positions = useMemoizedArray(externalPositions);

    const prevIsOpen = useRef(false);
    const prevPositions = useRef<PopoverPosition[] | undefined>();
    const prevContentLocation = useRef<
      ContentLocation | ContentLocationGetter | undefined
    >();
    const prevReposition = useRef(reposition);

    const childRef = useRef<HTMLElement | undefined>();

    const [popoverState, setPopoverState] = useState<PopoverState>({
      align,
      nudgedLeft: 0,
      nudgedTop: 0,
      position: positions[0],
      padding,
      childRect: Constants.EMPTY_CLIENT_RECT,
      popoverRect: Constants.EMPTY_CLIENT_RECT,
      parentRect: Constants.EMPTY_CLIENT_RECT,
      boundaryRect: Constants.EMPTY_CLIENT_RECT,
      boundaryInset,
    });

    const onPositionPopover = useCallback(
      // eslint-disable-next-line @typescript-eslint/no-shadow
      (popoverState: PopoverState) => setPopoverState(popoverState),
      [],
    );

    const {positionPopover, popoverRef, scoutRef} = usePopover({
      childRef,
      containerClassName,
      parentElement,
      boundaryElement,
      contentLocation,
      positions,
      align,
      padding,
      boundaryInset,
      reposition,
      onPositionPopover,
    });

    useLayoutEffect(() => {
      let shouldUpdate = true;
      const updatePopover = () => {
        if (isOpen && shouldUpdate) {
          const childRect = childRef?.current?.getBoundingClientRect();
          const popoverRect = popoverRef?.current?.getBoundingClientRect();
          if (
            childRect != null &&
            popoverRect != null &&
            (!rectsAreEqual(childRect, {
              top: popoverState.childRect.top,
              left: popoverState.childRect.left,
              width: popoverState.childRect.width,
              height: popoverState.childRect.height,
              bottom:
                popoverState.childRect.top + popoverState.childRect.height,
              right: popoverState.childRect.left + popoverState.childRect.width,
            } as any) ||
              popoverRect.width !== popoverState.popoverRect.width ||
              popoverRect.height !== popoverState.popoverRect.height ||
              popoverState.padding !== padding ||
              popoverState.align !== align ||
              positions !== prevPositions.current ||
              contentLocation !== prevContentLocation.current ||
              reposition !== prevReposition.current)
          ) {
            positionPopover();
          }

          // TODO: factor prev checks out into the custom prevs hook
          if (positions !== prevPositions.current) {
            prevPositions.current = positions;
          }
          if (contentLocation !== prevContentLocation.current) {
            prevContentLocation.current = contentLocation;
          }
          if (reposition !== prevReposition.current) {
            prevReposition.current = reposition;
          }

          if (shouldUpdate) {
            window.requestAnimationFrame(updatePopover);
          }
        }

        prevIsOpen.current = isOpen;
      };

      window.requestAnimationFrame(updatePopover);

      return () => {
        shouldUpdate = false;
      };
    }, [
      align,
      contentLocation,
      isOpen,
      padding,
      popoverRef,
      popoverState.align,
      popoverState.childRect.height,
      popoverState.childRect.left,
      popoverState.childRect.top,
      popoverState.childRect.width,
      popoverState.padding,
      popoverState.popoverRect.height,
      popoverState.popoverRect.width,
      positionPopover,
      positions,
      reposition,
    ]);

    useEffect(() => {
      const popoverElement = popoverRef.current;

      Object.assign(popoverElement.style, containerStyle);

      return () => {
        Object.keys(containerStyle ?? {}).forEach(
          key =>
            delete popoverElement.style[
              key as keyof Omit<typeof containerStyle, 'length' | 'parentRule'>
            ],
        );
      };
    }, [containerStyle, isOpen, popoverRef]);

    const handleOnClickOutside = useCallback(
      (e: MouseEvent) => {
        if (
          isOpen &&
          !popoverRef.current?.contains(e.target as Node) &&
          !childRef.current?.contains(e.target as Node)
        ) {
          onClickOutside?.(e);
        }
      },
      [isOpen, onClickOutside, popoverRef],
    );

    const handleWindowResize = useCallback(() => {
      if (childRef.current) {
        window.requestAnimationFrame(() => positionPopover());
      }
    }, [positionPopover]);

    useEffect(() => {
      window.addEventListener('click', handleOnClickOutside);
      window.addEventListener('resize', handleWindowResize);
      return () => {
        window.removeEventListener('click', handleOnClickOutside);
        window.removeEventListener('resize', handleWindowResize);
      };
    }, [handleOnClickOutside, handleWindowResize]);

    const handleRef = useCallback(
      (node: HTMLElement) => {
        childRef.current = node;
        if (externalRef != null) {
          if (typeof externalRef === 'object') {
            // eslint-disable-next-line no-param-reassign
            (externalRef as React.MutableRefObject<HTMLElement>).current = node;
          } else if (typeof externalRef === 'function') {
            (externalRef as (instance: HTMLElement) => void)(node);
          }
        }
      },
      [externalRef],
    );

    const renderChild = () =>
      cloneElement(children as JSX.Element, {
        ref: handleRef,
      });

    const renderPopover = () => {
      if (!isOpen) return null;
      return (
        <PopoverPortal
          element={popoverRef.current}
          scoutElement={scoutRef.current}
          container={parentElement}
        >
          {typeof content === 'function' ? content(popoverState) : content}
        </PopoverPortal>
      );
    };

    return (
      <>
        {renderChild()}
        {renderPopover()}
      </>
    );
  },
);

const Popover = forwardRef<HTMLElement, PopoverProps>((props, ref) => {
  if (typeof window === 'undefined') return props.children;
  return <PopoverInternal {...props} ref={ref} />;
});

Popover.displayName = 'Popover';
export default Popover;
