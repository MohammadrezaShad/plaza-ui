import {FC, useLayoutEffect} from 'react';
import {createPortal} from 'react-dom';

interface PopoverPortalProps {
  container: Element;
  element: Element;
  scoutElement: Element;
}

const PopoverPortal: FC<PopoverPortalProps> = ({
  container,
  element,
  scoutElement,
  children,
}) => {
  useLayoutEffect(() => {
    container.appendChild(element);
    container.appendChild(scoutElement);
    return () => {
      container.removeChild(element);
      container.removeChild(scoutElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [container, element]);

  return createPortal(children, element);
};

export {PopoverPortal};
