import {debounce} from '@plaza-ui/utils/lib/debounce';
import {ownerWindow} from '@plaza-ui/utils/lib/ownerWindow';
import * as React from 'react';

const styles = {
  width: 99,
  height: 99,
  position: 'absolute',
  top: -9999,
  overflow: 'scroll',
};

/**
 * @ignore - internal component.
 * The component originates from https://github.com/STORIS/react-scrollbar-size.
 * It has been moved into the core in order to minimize the bundle size.
 */

type ScrollbarSize = {
  onChange: (scrollbarHeight?: number) => void;
  className?: string;
};

export default function ScrollbarSize(props: ScrollbarSize) {
  const {onChange, ...other} = props;
  const scrollbarHeight = React.useRef<number>();
  const nodeRef = React.useRef<HTMLDivElement>(null);

  const setMeasurements = () => {
    scrollbarHeight.current =
      (nodeRef.current as HTMLDivElement).offsetHeight -
      (nodeRef.current as HTMLDivElement).clientHeight;
  };

  React.useEffect(() => {
    const handleResize = debounce(() => {
      const prevHeight = scrollbarHeight.current;
      setMeasurements();

      if (prevHeight !== scrollbarHeight.current) {
        onChange(scrollbarHeight.current);
      }
    });

    const containerWindow = ownerWindow(nodeRef.current as HTMLDivElement);
    containerWindow.addEventListener('resize', handleResize);
    return () => {
      handleResize.clear();
      containerWindow.removeEventListener('resize', handleResize);
    };
  }, [onChange]);

  React.useEffect(() => {
    setMeasurements();
    onChange(scrollbarHeight.current);
  }, [onChange]);

  return <div style={styles as React.CSSProperties} ref={nodeRef} {...other} />;
}
