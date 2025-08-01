import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import RootNavigator from '~navigations/RootNavigator';
import {GlobalStateProvider} from '~hooks/useGlobalContext';
import {getConfig} from '~helpers/app';
import {isTruthy} from '~helpers/values';

const App = () => {
  return (
    <GlobalStateProvider>
      <RootNavigator />
    </GlobalStateProvider>
  );
};

export default App;
