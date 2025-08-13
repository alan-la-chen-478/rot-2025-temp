import AsyncStorage from '@react-native-async-storage/async-storage';
import {produce} from 'immer';
import React, {useEffect, useState} from 'react';
import {createContainer} from 'react-tracked';
import initialState from '~configs/states';
import {objectGet, objectSet} from '~helpers/values';

export const cacheKey = 'cached';

const {
  Provider,
  useTrackedState: trackedStateCallback,
  useUpdate: updateCallback,
} = createContainer(() => {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    (async () =>
      setState({
        ...state,
        ...JSON.parse(await AsyncStorage.getItem(cacheKey)),
        usingInitialState: false,
      }))();
    // (async () => setState({...state, usingInitialState: false}))();
  }, []);

  useEffect(() => {
    if (state.usingInitialState) {
      return;
    }

    AsyncStorage.setItem(cacheKey, JSON.stringify(state));
  }, [state]);

  return [state, setState];
});

export const GlobalStateProvider = ({children}) => {
  return <Provider>{children}</Provider>;
};

export const getFullGlobalState = () => {
  return trackedStateCallback();
};

// const subValue = getGlobalState('subValue', false);
export const getGlobalState = (key, defaultValue = null) => {
  const state = trackedStateCallback();
  return objectGet(state, key, defaultValue);
};

export const setFullStateDraft = () => {
  const setState = updateCallback();
  return draft => setState(produce(draft));
};

export const setFullGlobalStateCallback = callback => {
  const setDraft = setFullStateDraft();
  return (...args) => setDraft(draft => callback.apply(null, [draft, ...args]));
};

export const useGlobalSetter = key => {
  const setDraft = setFullStateDraft();
  return value =>
    setDraft(draft => {
      objectSet(draft, key, value);
    });
};

export const useGlobalState = (key, defaultValue = null) => {
  return [getGlobalState(key, defaultValue), useGlobalSetter(key)];
};

export default useGlobalState;
