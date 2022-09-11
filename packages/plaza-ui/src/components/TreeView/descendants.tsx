/* eslint-disable @typescript-eslint/ban-types */
import {useIsomorphicLayoutEffect} from '@plaza-ui/hooks/lib/useIsomorphicLayoutEffect';
import React from 'react';

function findIndex(array: unknown[], comp: Function): number {
  for (let i = 0; i < array.length; i += 1) {
    if (comp(array[i])) {
      return i;
    }
  }

  return -1;
}

function binaryFindElement(array: any[], element: any) {
  let start = 0;
  let end = array.length - 1;

  while (start <= end) {
    const middle = Math.floor((start + end) / 2);

    if (array[middle].element === element) {
      return middle;
    }

    // eslint-disable-next-line no-bitwise
    if (
      // eslint-disable-next-line no-bitwise
      array[middle].element.compareDocumentPosition(element) &
      Node.DOCUMENT_POSITION_PRECEDING
    ) {
      end = middle - 1;
    } else {
      start = middle + 1;
    }
  }

  return start;
}

type DescendantsContextProps = {
  registerDescendant: Function;
  unregisterDescendant: Function;
  descendants: string[];
  parentId: string | null;
};

const DescendantContext = React.createContext<DescendantsContextProps>(
  {} as DescendantsContextProps,
);

if (process.env.NODE_ENV !== 'production') {
  DescendantContext.displayName = 'DescendantContext';
}

function usePrevious(value: any) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {};

export function useDescendant(descendant: any) {
  const [, forceUpdate] = React.useState<any>();
  const {
    registerDescendant = noop,
    unregisterDescendant = noop,
    descendants = [],
    parentId = null,
  } = React.useContext(DescendantContext);

  // This will initially return -1 because we haven't registered the descendant
  // on the first render. After we register, this will then return the correct
  // index on the following render and we will re-register descendants
  // so that everything is up-to-date before the user interacts with a
  // collection.
  const index = findIndex(
    descendants,
    (item: {element: any}) => item.element === descendant.element,
  );

  const previousDescendants = usePrevious(descendants);

  // We also need to re-register descendants any time ANY of the other
  // descendants have changed. My brain was melting when I wrote this and it
  // feels a little off, but checking in render and using the result in the
  // effect's dependency array works well enough.
  const someDescendantsHaveChanged = descendants.some(
    (newDescendant, position) =>
      previousDescendants &&
      previousDescendants[position] &&
      (previousDescendants[position] as any).element !==
        (newDescendant as any).element,
  );

  // Prevent any flashing
  useIsomorphicLayoutEffect(() => {
    if (descendant.element) {
      registerDescendant({
        ...descendant,
        index,
      });
      return () => {
        unregisterDescendant(descendant.element);
      };
    }
    forceUpdate({});

    return undefined;
  }, [
    registerDescendant,
    unregisterDescendant,
    index,
    someDescendantsHaveChanged,
    descendant,
  ]);

  return {parentId, index};
}

export function DescendantProvider(props: {
  children: React.ReactNode;
  id: string | null;
}) {
  const {children, id} = props;

  const [items, set] = React.useState<any>([]);

  const registerDescendant = React.useCallback(({element, ...other}) => {
    set((oldItems: any[]) => {
      let newItems;
      if (oldItems.length === 0) {
        // If there are no items, register at index 0 and bail.
        return [
          {
            ...other,
            element,
            index: 0,
          },
        ];
      }

      const index = binaryFindElement(oldItems, element);

      if (oldItems[index] && oldItems[index].element === element) {
        // If the element is already registered, just use the same array
        newItems = oldItems;
      } else {
        const newItem = {
          ...other,
          element,
          index,
        };

        // If an index is not found we will push the element to the end.
        newItems = oldItems.slice();
        newItems.splice(index, 0, newItem);
      }
      newItems.forEach((item: {index: any}, position: unknown) => {
        // eslint-disable-next-line no-param-reassign
        item.index = position;
      });
      return newItems;
    });
  }, []);

  const unregisterDescendant = React.useCallback(element => {
    set((oldItems: any[]) => oldItems.filter(item => element !== item.element));
  }, []);

  const value = React.useMemo(
    () => ({
      descendants: items,
      registerDescendant,
      unregisterDescendant,
      parentId: id,
    }),
    [items, registerDescendant, unregisterDescendant, id],
  );

  return (
    <DescendantContext.Provider value={value}>
      {children}
    </DescendantContext.Provider>
  );
}
