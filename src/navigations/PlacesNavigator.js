import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlacesListScreen from '~screens/PlacesListScreen';
import PlaceDetailScreen from '~screens/PlaceDetailScreen';

const Stack = createNativeStackNavigator();

const ToursNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="PlacesList" component={PlacesListScreen} />
      <Stack.Screen name="PlaceDetail" component={PlaceDetailScreen} />
    </Stack.Navigator>
  );
};

export default ToursNavigator;
