import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TourDetailScreen from '~screens/TourDetailScreen';
import ToursListScreen from '~screens/ToursListScreen';

const Stack = createNativeStackNavigator();

const ToursNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ToursList" component={ToursListScreen} />
      <Stack.Screen name="TourDetail" component={TourDetailScreen} />
    </Stack.Navigator>
  );
};

export default ToursNavigator;
