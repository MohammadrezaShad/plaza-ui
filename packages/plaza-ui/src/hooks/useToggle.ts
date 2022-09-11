import {useControlledWarning} from '@plaza-ui/hooks/lib/useControlledWarning';
import {useOnChangeReadOnlyWarning} from '@plaza-ui/hooks/lib/useOnChangeReadOnlyWarning';
import {useReducer, useRef} from 'react';

import {
  ToggleAction,
  ToggleActionTypes,
  ToggleState,
  UseToggleArgs,
} from '../shared/Toggle.types';

export const toggleReducer = (state: ToggleState, action: ToggleAction) => {
  switch (action.type) {
    case ToggleActionTypes.TOGGLE: {
      return {on: !state.on};
    }
    case ToggleActionTypes.RESET: {
      return action.initialState;
    }
    default: {
      throw new Error(`[Plaza-UI] : Unsupported type`);
    }
  }
};

export const useToggle = ({
  initialOn = false,
  reducer = toggleReducer,
  on: controlledOn,
  onChange,
  readOnly = false,
}: UseToggleArgs) => {
  const {current: initialState} = useRef({on: initialOn});
  const [state, dispatch] = useReducer(reducer, initialState);
  const isOnControlled = !!controlledOn;
  const on = isOnControlled ? controlledOn : state.on;

  useControlledWarning(controlledOn, 'on', 'useToggle');
  useOnChangeReadOnlyWarning(
    controlledOn,
    'on',
    'useToggle',
    Boolean(onChange),
    readOnly,
    'readOnly',
    'initialOn',
    'onChange',
  );

  const dispatchWithOnChange = (action: ToggleAction) => {
    if (!isOnControlled) {
      dispatch(action);
    }
    onChange?.(reducer({...state, on}, action), action);
  };

  const toggle = () => dispatchWithOnChange({type: ToggleActionTypes.TOGGLE});
  const reset = () =>
    dispatchWithOnChange({type: ToggleActionTypes.RESET, initialState});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const disabledAction = () => {};

  return {on, reset, toggle, disabledAction};
};
