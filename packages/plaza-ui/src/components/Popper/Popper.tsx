/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import {useForkRef} from '@plaza-ui/hooks/lib/useForkRef';
import {useIsomorphicLayoutEffect} from '@plaza-ui/hooks/lib/useIsomorphicLayoutEffect';
import {DefaultTheme} from '@plaza-ui/styles/lib/defaultTheme';
import {ownerDocument} from '@plaza-ui/utils/lib/ownerDocument';
import {
  createPopper,
  Instance,
  Options,
  OptionsGeneric,
  VirtualElement,
} from '@popperjs/core';
import * as React from 'react';
import {TransitionProps} from 'react-transition-group/Transition';
import {ThemeContext} from 'styled-components';

import Portal from '../Portal';
import {PortalProps} from '../Portal/Portal';

export type PopperPlacementType = Options['placement'];
type AnchorEl = null | VirtualElement | (() => VirtualElement);

export interface PopperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  ref?: React.Ref<HTMLDivElement>;
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl?: AnchorEl;
  /**
   * Popper render function or node.
   */
  children?:
    | React.ReactNode
    | ((props: {
        placement: PopperPlacementType;
        TransitionProps?: {
          in: boolean;
          onEnter: () => {};
          onExited: () => {};
        };
      }) => React.ReactNode);
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: PortalProps['container'];
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: PortalProps['disablePortal'];
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted?: boolean;
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers?: Options['modifiers'];
  /**
   * If `true`, the component is shown.
   */
  open: boolean;
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement?: PopperPlacementType;
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions?: Partial<OptionsGeneric<any>>;
  /**
   * A ref that points to the used popper instance.
   */
  popperRef?: React.Ref<Instance>;
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition?: boolean;
  TransitionProps?: any;
}

function flipPlacement(placement: PopperPlacementType, theme: DefaultTheme) {
  const direction = (theme && theme.direction) || 'ltr';

  if (direction === 'ltr') {
    return placement;
  }

  switch (placement) {
    case 'bottom-end':
      return 'bottom-start';
    case 'bottom-start':
      return 'bottom-end';
    case 'top-end':
      return 'top-start';
    case 'top-start':
      return 'top-end';
    default:
      return placement;
  }
}

function resolveAnchorEl(anchorEl: AnchorEl) {
  return typeof anchorEl === 'function' ? anchorEl() : anchorEl;
}

const defaultPopperOptions = {};

const PopperTooltip = React.forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    props: PopperProps,
    ref: React.Ref<T>,
  ) => {
    const {
      anchorEl,
      children,
      disablePortal,
      modifiers,
      open,
      placement: initialPlacement = 'bottom',
      popperOptions,
      popperRef: popperRefProp,
      TransitionProps,
      ...other
    } = props;
    const tooltipRef = React.useRef(null);
    const ownRef = useForkRef(tooltipRef, ref);

    const popperRef = React.useRef<any>(null);
    const handlePopperRef = useForkRef(popperRef, popperRefProp);
    const handlePopperRefRef = React.useRef(handlePopperRef);

    useIsomorphicLayoutEffect(() => {
      handlePopperRefRef.current = handlePopperRef;
    }, [handlePopperRef]);
    React.useImperativeHandle(popperRefProp, () => popperRef.current, []);

    const theme = React.useContext(ThemeContext);
    const rtlPlacement = flipPlacement(initialPlacement, theme);
    /**
     * placement initialized from prop but can change during lifetime if modifiers.flip.
     * modifiers.flip is essentially a flip for controlled/uncontrolled behavior
     */
    const [placement, setPlacement] = React.useState(rtlPlacement);

    React.useEffect(() => {
      if (popperRef.current) {
        popperRef.current.forceUpdate();
      }
    });

    useIsomorphicLayoutEffect(() => {
      if (!anchorEl || !open) {
        return undefined;
      }

      const handlePopperUpdate = (data: any) => {
        setPlacement(data.placement);
      };

      const resolvedAnchorEl = resolveAnchorEl(anchorEl);

      if (process.env.NODE_ENV !== 'production') {
        if (resolvedAnchorEl && (resolvedAnchorEl as any).nodeType === 1) {
          const box = resolvedAnchorEl.getBoundingClientRect();

          if (
            process.env.NODE_ENV !== 'test' &&
            box.top === 0 &&
            box.left === 0 &&
            box.right === 0 &&
            box.bottom === 0
          ) {
            console.warn(
              [
                '[Plaza-UI] : The `anchorEl` prop provided to the component is invalid.',
                'The anchor element should be part of the document layout.',
                "Make sure the element is present in the document or that it's not display none.",
              ].join('\n'),
            );
          }
        }
      }

      let popperModifiers = [
        {
          name: 'preventOverflow',
          options: {
            altBoundary: disablePortal,
          },
        },
        {
          name: 'flip',
          options: {
            altBoundary: disablePortal,
          },
        },
        {
          name: 'onUpdate',
          enabled: true,
          phase: 'afterWrite',
          fn: ({state}: any) => {
            handlePopperUpdate(state);
          },
        },
      ];

      if (modifiers != null) {
        popperModifiers = popperModifiers.concat(modifiers as any);
      }
      if (popperOptions && popperOptions.modifiers != null) {
        popperModifiers = popperModifiers.concat(popperOptions.modifiers);
      }

      const popper = createPopper(
        resolveAnchorEl(anchorEl as any) as any,
        tooltipRef.current as any,
        {
          placement: rtlPlacement,
          ...popperOptions,
          modifiers: popperModifiers as any,
        },
      );

      (handlePopperRefRef as any)?.current(popper);

      return () => {
        popper.destroy();
        (handlePopperRefRef as any)?.current(null);
      };
    }, [anchorEl, disablePortal, modifiers, open, popperOptions, rtlPlacement]);

    const childProps: any = {placement};

    if (TransitionProps !== null) {
      childProps.TransitionProps = TransitionProps;
    }

    return (
      <div ref={ownRef as any} role="tooltip" {...other}>
        {typeof children === 'function' ? children(childProps) : children}
      </div>
    );
  },
);

PopperTooltip.displayName = 'PopperTooltip';

const Popper = React.forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    props: PopperProps,
    ref: React.Ref<T>,
  ) => {
    const {
      anchorEl,
      children,
      container: containerProp,
      disablePortal = false,
      keepMounted = false,
      modifiers,
      open,
      placement = 'bottom',
      popperOptions = defaultPopperOptions,
      popperRef,
      style,
      transition = false,
      ...other
    } = props;

    const [exited, setExited] = React.useState(true);

    const handleEnter = () => {
      setExited(false);
    };

    const handleExited = () => {
      setExited(true);
    };

    if (!keepMounted && !open && (!transition || exited)) {
      return null;
    }

    // If the container prop is provided, use that
    // If the anchorEl prop is provided, use its parent body element as the container
    // If neither are provided let the Modal take care of choosing the container
    const container =
      containerProp ||
      (anchorEl
        ? ownerDocument(resolveAnchorEl(anchorEl as any) as any).body
        : undefined);

    return (
      <Portal disablePortal={disablePortal} container={container}>
        <PopperTooltip
          anchorEl={anchorEl}
          disablePortal={disablePortal}
          modifiers={modifiers}
          ref={ref}
          open={transition ? !exited : open}
          placement={placement}
          popperOptions={popperOptions}
          popperRef={popperRef}
          {...other}
          style={{
            // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
            position: 'fixed',
            // Fix Popper.js display issue
            top: 0,
            left: 0,
            display: (!open && keepMounted && !transition
              ? 'none'
              : null) as any,
            ...style,
          }}
          TransitionProps={
            transition
              ? {
                  in: open,
                  onEnter: handleEnter,
                  onExited: handleExited,
                }
              : null
          }
        >
          {children}
        </PopperTooltip>
      </Portal>
    );
  },
);

Popper.displayName = 'Popper';

export default Popper;
