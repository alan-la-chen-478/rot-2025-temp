import {registerRootComponent} from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';
import Notifee from '@notifee/react-native';

import App from './src/App';

EStyleSheet.build();

Notifee.registerForegroundService(notification => {
  return new Promise(async () => {});
});

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
