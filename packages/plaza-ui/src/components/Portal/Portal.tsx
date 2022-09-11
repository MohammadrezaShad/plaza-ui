import {useForkRef} from '@plaza-ui/hooks/lib//useForkRef';
import {setRef} from '@plaza-ui/hooks/lib/setRef';
import {useIsomorphicLayoutEffect} from '@plaza-ui/hooks/lib/useIsomorphicLayoutEffect';
import React, {forwardRef, Ref} from 'react';
import ReactDOM from 'react-dom';

export interface PortalProps {
  /**
   * The children to render into the `container`.
   */
  children?: React.ReactNode;
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container?: Element | (() => Element | null) | null;
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal?: boolean;
}

function getContainer(
  container: Element | (() => Element | null) | null | undefined,
) {
  return typeof container === 'function' ? container() : container;
}

const Portal = forwardRef(
  <T extends HTMLElement = HTMLDivElement>(props: PortalProps, ref: Ref<T>) => {
    const {children, container, disablePortal = false} = props;
    const [mountNode, setMountNode] = React.useState<any>(null);
    const handleRef = useForkRef(
      React.isValidElement(children) ? (children as any).ref : null,
      ref,
    );

    useIsomorphicLayoutEffect(() => {
      if (!disablePortal) {
        setMountNode(getContainer(container) || document.body);
      }
    }, [container, disablePortal]);

    useIsomorphicLayoutEffect(() => {
      if (mountNode && !disablePortal) {
        setRef(ref, mountNode);
        return () => {
          setRef(ref, null);
        };
      }

      return undefined;
    }, [ref, mountNode, disablePortal]);

    if (disablePortal) {
      if (React.isValidElement(children)) {
        return React.cloneElement(children, {
          ref: handleRef,
        });
      }
      return children;
    }

    return mountNode ? ReactDOM.createPortal(children, mountNode) : mountNode;
  },
);

Portal.displayName = 'Portal';
export default Portal;
