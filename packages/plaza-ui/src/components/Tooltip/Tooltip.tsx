/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import {useControlled} from '@plaza-ui/hooks/lib/useControlled';
import {useEventCallback} from '@plaza-ui/hooks/lib/useEventCallback';
import {useForkRef} from '@plaza-ui/hooks/lib/useForkRef';
import {useId} from '@plaza-ui/hooks/lib/useId';
import {useIsFocusVisible} from '@plaza-ui/hooks/lib/useIsFocusVisible';
import composeClasses from '@plaza-ui/utils/lib/composeClasses';
import clsx from 'clsx';
import * as React from 'react';
import {TransitionProps} from 'react-transition-group/Transition';
import {ThemeContext} from 'styled-components';

import useSxProp, {SxType} from '../../hooks/useSxProp';
import capitalize from '../../utils/capitalize';
import Grow from '../Grow';
import Popper from '../Popper';
import {PopperProps} from '../Popper/Popper';
import * as S from './Tooltip.styled';
import {getTooltipUtilityClass, TooltipClasses} from './tooltipClasses';

export interface TooltipProps {
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow?: boolean;
  /**
   * Tooltip reference element.
   */
  children: React.ReactElement<any, any>;
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<TooltipClasses>;
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild?: boolean;
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener?: boolean;
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener?: boolean;
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive?: boolean;
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener?: boolean;
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay?: number;
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay?: number;
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay?: number;
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor?: boolean;
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id?: string;
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay?: number;
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay?: number;
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose?: (event: React.SyntheticEvent | Event) => void;
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen?: (event: React.SyntheticEvent) => void;
  /**
   * If `true`, the component is shown.
   */
  open?: boolean;
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement?:
    | 'bottom-end'
    | 'bottom-start'
    | 'bottom'
    | 'left-end'
    | 'left-start'
    | 'left'
    | 'right-end'
    | 'right-start'
    | 'right'
    | 'top-end'
    | 'top-start'
    | 'top';
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent?: React.JSXElementConstructor<PopperProps>;
  /**
   * Props applied to the [`Popper`](/api/popper/) element.
   * @default {}
   */
  PopperProps?: Partial<PopperProps>;
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  /**
   * Tooltip title. Zero-length titles string are never displayed.
   */
  title?: NonNullable<React.ReactNode>;
  /**
   * The component used for the transition.
   * [Follow this guide](/components/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent?: React.JSXElementConstructor<
    TransitionProps & {children?: React.ReactElement<any, any>}
  >;
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition) component.
   */
  TransitionProps?: TransitionProps;
  sx?: SxType;
}

const useUtilityClasses = (
  ownerState: Pick<
    TooltipProps,
    'classes' | 'disableInteractive' | 'arrow' | 'placement'
  >,
) => {
  const {classes, disableInteractive, arrow, placement} = ownerState;

  const slots = {
    popper: [
      'popper',
      !disableInteractive && 'popperInteractive',
      arrow && 'popperArrow',
    ],
    tooltip: ['tooltip', arrow && 'tooltipArrow'],
    arrow: ['arrow'],
  };

  return composeClasses(slots, getTooltipUtilityClass, classes);
};

function round(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

let hystersisOpen = false;
let hystersisTimer: any = null;

export function testReset() {
  hystersisOpen = false;
  clearTimeout(hystersisTimer as number);
}

function composeEventHandler(handler: any, eventHandler: any) {
  return (event: any) => {
    if (eventHandler) {
      eventHandler(event);
    }
    handler(event);
  };
}

const Tooltip = React.forwardRef(
  <T extends HTMLElement = HTMLDivElement>(
    props: TooltipProps,
    ref: React.Ref<T>,
  ) => {
    const theme = React.useContext(ThemeContext);
    const {
      arrow = true,
      children,
      describeChild = false,
      disableFocusListener = false,
      disableHoverListener = false,
      disableInteractive: disableInteractiveProp = false,
      disableTouchListener = false,
      enterDelay = 100,
      enterNextDelay = 0,
      enterTouchDelay = 700,
      followCursor = false,
      id: idProp,
      leaveDelay = 0,
      leaveTouchDelay = 1500,
      onClose,
      onOpen,
      open: openProp,
      placement = 'top',
      PopperComponent = Popper,
      PopperProps = {},
      title,
      TransitionComponent = Grow,
      TransitionProps,
      sx,
      ...other
    } = props;

    const isRtl = theme.direction === 'rtl';

    const sxStyles = useSxProp(sx);
    const [childNode, setChildNode] = React.useState<any>();
    const [arrowRef, setArrowRef] = React.useState(null);
    const ignoreNonTouchEvents = React.useRef(false);

    const disableInteractive = disableInteractiveProp || followCursor;

    const closeTimer = React.useRef<any>();
    const enterTimer = React.useRef<any>();
    const leaveTimer = React.useRef<any>();
    const touchTimer = React.useRef<any>();
    const noderef = React.useRef<any>();

    const [openState, setOpenState] = useControlled({
      controlled: openProp,
      default: false,
      name: 'Tooltip',
      state: 'open',
    });

    let open = openState;

    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const {current: isControlled} = React.useRef(openProp !== undefined);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        if (
          childNode &&
          childNode.disabled &&
          !isControlled &&
          title !== '' &&
          childNode.tagName.toLowerCase() === 'button'
        ) {
          console.error(
            [
              '[Plaza-UI]: You are providing a disabled `button` child to the Tooltip component.',
              'A disabled element does not fire events.',
              "Tooltip needs to listen to the child element's events to display the title.",
              '',
              'Add a simple wrapper element, such as a `span`.',
            ].join('\n'),
          );
        }
      }, [title, childNode, isControlled]);
    }

    const id = useId(idProp);

    const prevUserSelect = React.useRef<any>();
    const stopTouchInteraction = React.useCallback(() => {
      if (prevUserSelect.current !== undefined) {
        document.body.style.userSelect = prevUserSelect.current;
        prevUserSelect.current = undefined;
      }
      clearTimeout(touchTimer.current);
    }, []);

    React.useEffect(
      () => () => {
        clearTimeout(closeTimer.current);
        clearTimeout(enterTimer.current);
        clearTimeout(leaveTimer.current);
        stopTouchInteraction();
      },
      [stopTouchInteraction],
    );

    const handleOpen = (event: any) => {
      hystersisTimer && clearTimeout(hystersisTimer);
      hystersisOpen = true;

      // The mouseover event will trigger for every nested element in the tooltip.
      // We can skip rerendering when the tooltip is already open.
      // We are using the mouseover event instead of the mouseenter event to fix a hide/show issue.
      setOpenState(true);

      if (onOpen && !open) {
        onOpen(event);
      }
    };

    const handleClose = useEventCallback(
      /**
       * @param {React.SyntheticEvent | Event} event
       */
      (event: React.SyntheticEvent | Event) => {
        hystersisTimer && clearTimeout(hystersisTimer);
        hystersisTimer = setTimeout(() => {
          hystersisOpen = false;
        }, 800 + leaveDelay);
        setOpenState(false);

        if (onClose && open) {
          onClose(event);
        }

        clearTimeout(closeTimer.current);
        closeTimer.current = setTimeout(() => {
          ignoreNonTouchEvents.current = false;
        }, +theme.transition.duration);
      },
    );

    const handleEnter = (event: any) => {
      if (ignoreNonTouchEvents.current && event.type !== 'touchstart') {
        return;
      }

      // Remove the title ahead of time.
      // We don't want to wait for the next render commit.
      // We would risk displaying two tooltips at the same time (native + this one).
      if (childNode) {
        childNode.removeAttribute('title');
      }

      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      if (enterDelay || (hystersisOpen && enterNextDelay)) {
        enterTimer.current = setTimeout(
          () => {
            handleOpen(event);
          },
          hystersisOpen ? enterNextDelay : enterDelay,
        );
      } else {
        handleOpen(event);
      }
    };

    const handleLeave = (event: any) => {
      clearTimeout(enterTimer.current);
      clearTimeout(leaveTimer.current);
      leaveTimer.current = setTimeout(() => {
        handleClose(event);
      }, leaveDelay);
    };

    const {
      isFocusVisibleRef,
      onBlur: handleBlurVisible,
      onFocus: handleFocusVisible,
      ref: focusVisibleRef,
    } = useIsFocusVisible();
    // We don't necessarily care about the focusVisible state (which is safe to access via ref anyway).
    // We just need to re-render the Tooltip if the focus-visible state changes.
    const [, setChildIsFocusVisible] = React.useState(false);
    const handleBlur = (event: any) => {
      handleBlurVisible();
      if (isFocusVisibleRef.current === false) {
        setChildIsFocusVisible(false);
        handleLeave(event);
      }
    };

    const handleFocus = (event: any) => {
      // Workaround for https://github.com/facebook/react/issues/7769
      // The autoFocus of React might trigger the event before the componentDidMount.
      // We need to account for this eventuality.
      if (!childNode) {
        setChildNode(event.currentTarget);
      }

      handleFocusVisible(event);
      if (isFocusVisibleRef.current === true) {
        setChildIsFocusVisible(true);
        handleEnter(event);
      }
    };

    const detectTouchStart = (event: any) => {
      ignoreNonTouchEvents.current = true;

      const childrenProps = children.props;
      if (childrenProps.onTouchStart) {
        childrenProps.onTouchStart(event);
      }
    };

    const handleMouseOver = handleEnter;
    const handleMouseLeave = handleLeave;

    const handleTouchStart = (event: any) => {
      detectTouchStart(event);
      clearTimeout(leaveTimer.current);
      clearTimeout(closeTimer.current);
      stopTouchInteraction();

      prevUserSelect.current = document.body.style.webkitUserSelect;
      // Prevent iOS text selection on long-tap.
      document.body.style.webkitUserSelect = 'none';

      touchTimer.current = setTimeout(() => {
        document.body.style.userSelect = prevUserSelect.current;
        handleEnter(event);
      }, enterTouchDelay);
    };

    const handleTouchEnd = (event: any) => {
      if (children.props.onTouchEnd) {
        children.props.onTouchEnd(event);
      }

      clearTimeout(touchTimer.current);
      clearTimeout(leaveTimer.current);
      leaveTimer.current = setTimeout(() => {
        handleClose(event);
      }, leaveTouchDelay);
    };

    React.useEffect(() => {
      if (!open) {
        return undefined;
      }

      /**
       * @param {KeyboardEvent} nativeEvent
       */
      function handleKeyDown(nativeEvent: any) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          handleClose(nativeEvent);
        }
      }

      document.addEventListener('keydown', handleKeyDown);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [handleClose, open]);

    const handleUseRef = useForkRef(setChildNode, ref);
    const handleFocusRef = useForkRef(focusVisibleRef, handleUseRef);
    const handleRef = useForkRef((children as any).ref, handleFocusRef);

    // There is no point in displaying an empty tooltip.
    if (title === '') {
      open = false;
    }

    const positionRef = React.useRef({x: 0, y: 0});
    const popperRef = React.useRef();

    const handleMouseMove = (event: any) => {
      const childrenProps = children.props;
      if (childrenProps.onMouseMove) {
        childrenProps.onMouseMove(event);
      }

      positionRef.current = {x: event.clientX, y: event.clientY};

      if (popperRef.current) {
        (popperRef as any).current.update();
      }
    };

    const nameOrDescProps = {};
    const titleIsString = typeof title === 'string';
    if (describeChild) {
      (nameOrDescProps as any).title =
        !open && titleIsString && !disableHoverListener ? title : null;
      (nameOrDescProps as any)['aria-describedby'] = open ? id : null;
    } else {
      (nameOrDescProps as any)['aria-label'] = titleIsString ? title : null;
      (nameOrDescProps as any)['aria-labelledby'] =
        open && !titleIsString ? id : null;
    }

    const childrenProps = {
      ...nameOrDescProps,
      ...other,
      ...children.props,
      className: children.props.className,
      onTouchStart: detectTouchStart,
      ref: handleRef,
      ...(followCursor ? {onMouseMove: handleMouseMove} : {}),
    };

    if (process.env.NODE_ENV !== 'production') {
      childrenProps['data-pui-internal-clone-element'] = true;

      // eslint-disable-next-line react-hooks/rules-of-hooks
      React.useEffect(() => {
        if (
          childNode &&
          !childNode.getAttribute('data-pui-internal-clone-element')
        ) {
          console.error(
            [
              '[Plaza-UI]: The `children` component of the Tooltip is not forwarding its props correctly.',
              'Please make sure that props are spread on the same element that the ref is applied to.',
            ].join('\n'),
          );
        }
      }, [childNode]);
    }

    const interactiveWrapperListeners = {};

    if (!disableTouchListener) {
      childrenProps.onTouchStart = handleTouchStart;
      childrenProps.onTouchEnd = handleTouchEnd;
    }

    if (!disableHoverListener) {
      childrenProps.onMouseOver = composeEventHandler(
        handleMouseOver,
        childrenProps.onMouseOver,
      );
      childrenProps.onMouseLeave = composeEventHandler(
        handleMouseLeave,
        childrenProps.onMouseLeave,
      );

      if (!disableInteractive) {
        (interactiveWrapperListeners as any).onMouseOver = handleMouseOver;
        (interactiveWrapperListeners as any).onMouseLeave = handleMouseLeave;
      }
    }

    if (!disableFocusListener) {
      childrenProps.onFocus = composeEventHandler(
        handleFocus,
        childrenProps.onFocus,
      );
      childrenProps.onBlur = composeEventHandler(
        handleBlur,
        childrenProps.onBlur,
      );

      if (!disableInteractive) {
        (interactiveWrapperListeners as any).onFocus = handleFocus;
        (interactiveWrapperListeners as any).onBlur = handleBlur;
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      if (children.props.title) {
        console.error(
          [
            '[Plaza-UI]: You have provided a `title` prop to the child of <Tooltip />.',
            `Remove this title prop \`${children.props.title}\` or the Tooltip component.`,
          ].join('\n'),
        );
      }
    }

    const popperOptions = React.useMemo(() => {
      let tooltipModifiers = [
        {
          name: 'arrow',
          enabled: Boolean(arrowRef),
          options: {
            element: arrowRef,
            padding: 4,
          },
        },
      ];

      if (PopperProps.popperOptions?.modifiers) {
        tooltipModifiers = tooltipModifiers.concat(
          PopperProps.popperOptions.modifiers,
        );
      }

      return {
        ...PopperProps.popperOptions,
        modifiers: tooltipModifiers,
      };
    }, [arrowRef, PopperProps]);

    const ownerState = {
      ...props,
      isRtl,
      arrow,
      disableInteractive,
      placement,
      PopperComponent,
      touch: ignoreNonTouchEvents.current,
    };

    const classes = useUtilityClasses(ownerState);

    return (
      <>
        {React.cloneElement(children, childrenProps)}
        <S.TooltipPopper
          className={clsx(classes.popper, PopperProps?.className)}
          as={PopperComponent}
          $sx={sxStyles}
          placement={placement}
          anchorEl={
            followCursor
              ? {
                  getBoundingClientRect: () => ({
                    top: positionRef.current.y,
                    left: positionRef.current.x,
                    right: positionRef.current.x,
                    bottom: positionRef.current.y,
                    width: 0,
                    height: 0,
                  }),
                }
              : childNode
          }
          popperRef={popperRef as any}
          open={childNode ? open : false}
          id={id}
          transition
          {...interactiveWrapperListeners}
          {...PopperProps}
          popperOptions={popperOptions}
          $ownerState={ownerState}
        >
          {({TransitionProps: TransitionPropsInner}: any) => (
            <TransitionComponent
              {...TransitionPropsInner}
              {...TransitionProps}
              className={clsx(classes.tooltip)}
              ref={noderef}
            >
              <S.TooltipTooltip $ownerState={ownerState} ref={noderef}>
                {title}
                {arrow ? (
                  <S.TooltipArrow
                    className={clsx(classes.arrow)}
                    ref={setArrowRef as any}
                    // ownerState={ownerState}
                  />
                ) : null}
              </S.TooltipTooltip>
            </TransitionComponent>
          )}
        </S.TooltipPopper>
      </>
    );
  },
);

Tooltip.displayName = 'Tooltip';

export default Tooltip;
