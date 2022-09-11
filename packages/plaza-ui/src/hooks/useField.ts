/* Hooks */
import {useControlledWarning} from '@plaza-ui/hooks/lib/useControlledWarning';
import {useOnChangeReadOnlyWarning} from '@plaza-ui/hooks/lib/useOnChangeReadOnlyWarning';
import React, {useReducer, useRef} from 'react';

import {
  FieldAction,
  FieldActionTypes,
  FieldState,
  UseFieldArgs,
} from '../shared/Field.types';

export const fieldReducer = (state: FieldState, action: FieldAction) => {
  switch (action.type) {
    case FieldActionTypes.CHANGE: {
      return {...state, value: action.payload};
    }
    case FieldActionTypes.RESET: {
      return {...state, value: action.initialState.value};
    }
    default: {
      return state;
    }
  }
};

export const useFiled = ({
  initialValue = '',
  reducer = fieldReducer,
  value: controlledValue,
  onChange,
  readOnly = false,
}: UseFieldArgs) => {
  const {current: initialState} = useRef({value: initialValue});
  const [state, dispatch] = useReducer(reducer, initialState);
  const isValueControlled = !!controlledValue;
  const value = isValueControlled ? controlledValue : state.value;

  useControlledWarning(controlledValue, 'value', 'useFiled');
  useOnChangeReadOnlyWarning(
    controlledValue,
    'value',
    'useFiled',
    Boolean(onChange),
    readOnly,
    'readOnly',
    'initialValue',
    'onChange',
  );

  const dispatchWithOnChange = (action: FieldAction) => {
    if (!isValueControlled) {
      dispatch(action);
    }
    onChange?.(reducer({...state, value}, action), action);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    dispatchWithOnChange({
      type: FieldActionTypes.CHANGE,
      payload: event.target.value,
    });
  const reset = () =>
    dispatchWithOnChange({type: FieldActionTypes.RESET, initialState});

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const disabledAction = () => {};

  return {value, reset, handleChange, disabledAction};
};
