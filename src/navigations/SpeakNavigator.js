import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SpeakScreen from '~screens/SpeakScreen';
import SpeakDetailScreen from '~screens/SpeakDetailScreen';

const Stack = createNativeStackNavigator();

const SpeakNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllRooms" component={SpeakScreen} />
      <Stack.Screen name="SpeakDetail" component={SpeakDetailScreen} />
    </Stack.Navigator>
  );
};

export default SpeakNavigator;
