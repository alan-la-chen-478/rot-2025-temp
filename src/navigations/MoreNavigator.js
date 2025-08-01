import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoreMainScreen from '~screens/MoreMainScreen';
import SettingScreen from '~screens/SettingScreen';
import AboutScreen from '~screens/AboutScreen';
import TermsAndConditionsScreen from '~screens/TermsAndConditionsScreen';
import HelpsFaqScreen from '~screens/HelpsFaqScreen';
import PlaceholderScreen from '~screens/PlaceholderScreen';

const Stack = createNativeStackNavigator();

const MoreNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="MoreMain" component={MoreMainScreen} />
      <Stack.Screen name="Settings" component={SettingScreen} />
      <Stack.Screen name="AboutUs" component={AboutScreen} />
      <Stack.Screen name="TermsAndConditions" component={TermsAndConditionsScreen} />
      <Stack.Screen name="HelpsFAQ" component={HelpsFaqScreen} />
    </Stack.Navigator>
  );
};

export default MoreNavigator;
