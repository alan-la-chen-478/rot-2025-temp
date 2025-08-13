import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CodeLoginScreen from '~screens/CodeLoginScreen';
import EmailScreen from '~screens/EmailScreen';
import GuideLoginScreen from '~screens/GuideLoginScreen';
import LoginHelpScreen from '~screens/LoginHelpScreen';
import LoginScreen from '~screens/LoginScreen';
import RegisterScreen from '~screens/RegisterScreen';

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="EmailScreen" component={EmailScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CodeLogin" component={CodeLoginScreen} />
      <Stack.Screen name="GuideLogin" component={GuideLoginScreen} />
      <Stack.Screen name="LoginHelp" component={LoginHelpScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
