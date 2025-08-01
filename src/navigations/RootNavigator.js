import React, {useState, useEffect} from 'react';
import {View, Text, Pressable, Alert} from 'react-native';
import {NavigationContainer, useNavigationContainerRef} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';
import Api, {apiClient} from '~libraries/Api';
import {getGlobalState, useGlobalState, cacheKey} from '~hooks/useGlobalContext';
import useAppReadied from '~hooks/useAppReadied';
import MainNavigator from '~navigations/MainNavigator';
import AuthNavigator from '~navigations/AuthNavigator';
import DevScreen from '~screens/DevScreen';
import SplashScreen from '~screens/SplashScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  const navigationRef = useNavigationContainerRef();
  const loggedIn = getGlobalState('loggedIn');
  const isAppReadied = useAppReadied();
  const [currentUser, setCurrentUser] = useGlobalState('currentUser');
  const [navigationState, setNavigationState] = useGlobalState('navigationState');

  const maybeSaveNavigationState = state => {
    const currentRoute = state.routes[state.index].name;

    if (['Developer', 'RoomDetail'].includes(currentRoute)) {
      return;
    }

    setNavigationState(JSON.stringify(state));
  };

  useEffect(() => {
    if (!loggedIn) {
      return;
    }

    (async () => {
      const data = await Api('/users/me');

      if (data === false) {
        Alert.alert(
          'You are currently offline',
          'You are not connected to internet. Previous offline data will still be available, but might not be up to date.',
        );
        return;
      }

      if (!data.success) {
        console.log(data);
        await AsyncStorage.removeItem(cacheKey);
        return RNRestart.Restart();
      }

      if (await AsyncStorage.removeItem('crash_reset')) {
        console.log('crash reset');
        await AsyncStorage.removeItem('crash_reset');
        setNavigationState(null);
        return RNRestart.Restart();
      }

      setCurrentUser(data.data.user);
    })();
  }, []);

  let screens = null;

  if (isAppReadied) {
    if (loggedIn) {
      screens = <Stack.Screen name="Main" component={MainNavigator} />;
    } else {
      screens = <Stack.Screen name="Auth" component={AuthNavigator} />;
    }
  } else {
    screens = <Stack.Screen name="SplashScreen" component={SplashScreen} />;
  }

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={JSON.parse(navigationState || null)}
      onStateChange={maybeSaveNavigationState}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {screens}
        <Stack.Screen name="Developer" component={DevScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
