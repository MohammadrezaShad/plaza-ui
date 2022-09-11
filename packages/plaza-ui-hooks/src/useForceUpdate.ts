import React from 'react';

export function useForceUpdate() {
  const [, updateState] = React.useState<unknown>();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  return forceUpdate;
}
