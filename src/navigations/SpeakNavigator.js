import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import SpeakDetailScreen from '~screens/SpeakDetailScreen';
import SpeakScreen from '~screens/SpeakScreen';

const Stack = createNativeStackNavigator();

const SpeakNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AllRooms" component={SpeakScreen} />
      <Stack.Screen name="SpeakDetail" component={SpeakDetailScreen} />
    </Stack.Navigator>
  );
};

export default SpeakNavigator;
