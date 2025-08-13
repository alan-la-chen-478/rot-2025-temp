import React from 'react';
import {GlobalStateProvider} from '~hooks/useGlobalContext';
import RootNavigator from '~navigations/RootNavigator';

const App = () => {
  return (
    <GlobalStateProvider>
      <RootNavigator />
    </GlobalStateProvider>
  );
};

export default App;
