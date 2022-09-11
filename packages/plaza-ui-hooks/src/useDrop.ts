import {noop, off, on} from '@plaza-ui/utils/lib/main';
import {useCallback, useEffect, useMemo, useState} from 'react';

export interface DropAreaState {
  over: boolean;
}

export interface DropAreaBond {
  onDragOver: React.DragEventHandler;
  onDragEnter: React.DragEventHandler;
  onDragLeave: React.DragEventHandler;
  onDrop: React.DragEventHandler;
  onPaste: React.ClipboardEventHandler;
}

export interface DropAreaOptions {
  onFiles?: (files: File[], event?: any) => void;
  onText?: (text: string, event?: any) => void;
  onUri?: (url: string, event?: any) => void;
}

const createProcess =
  (options: DropAreaOptions) =>
  (
    dataTransfer: DataTransfer,
    event: {clipboardData: {getData: (arg0: string) => any}},
  ) => {
    const uri = dataTransfer.getData('text/uri-list');

    if (uri) {
      (options.onUri || noop)(uri, event);
      return;
    }

    if (dataTransfer.files && dataTransfer.files.length) {
      (options.onFiles || noop)(Array.from(dataTransfer.files), event);
      return;
    }

    if (event.clipboardData) {
      const text = event.clipboardData.getData('text');
      (options.onText || noop)(text, event);
    }
  };

export const useDrop = (
  options: DropAreaOptions = {},
  args = [],
): DropAreaState => {
  const {onFiles, onText, onUri} = options;
  const [over, setOverRaw] = useState<boolean>(false);
  const setOver = useCallback(setOverRaw, []);
  const process = useMemo(
    () => createProcess(options),
    [onFiles, onText, onUri],
  );

  useEffect(() => {
    const onDragOver = (event: {preventDefault: () => void}) => {
      event.preventDefault();
      setOver(true);
    };

    const onDragEnter = (event: {preventDefault: () => void}) => {
      event.preventDefault();
      setOver(true);
    };

    const onDragLeave = () => {
      setOver(false);
    };

    const onDragExit = () => {
      setOver(false);
    };

    const onDrop = (event: {
      preventDefault: () => void;
      dataTransfer: DataTransfer;
    }) => {
      event.preventDefault();
      setOver(false);
      process(event.dataTransfer, event as any);
    };

    const onPaste = (event: {clipboardData: DataTransfer}) => {
      process(event.clipboardData, event);
    };

    on(document, 'dragover', onDragOver);
    on(document, 'dragenter', onDragEnter);
    on(document, 'dragleave', onDragLeave);
    on(document, 'dragexit', onDragExit);
    on(document, 'drop', onDrop);
    if (onText) {
      on(document, 'paste', onPaste);
    }

    return () => {
      off(document, 'dragover', onDragOver);
      off(document, 'dragenter', onDragEnter);
      off(document, 'dragleave', onDragLeave);
      off(document, 'dragexit', onDragExit);
      off(document, 'drop', onDrop);
      off(document, 'paste', onPaste);
    };
  }, [process, ...args]);

  return {over};
};

export default useDrop;
