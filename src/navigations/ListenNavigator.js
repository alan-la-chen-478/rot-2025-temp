import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RoomsScreen from '~screens/RoomsScreen';
import RoomDetailScreen from '~screens/RoomDetailScreen';

const Stack = createNativeStackNavigator();

const ListenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="AllRooms" component={RoomsScreen} />
      <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
    </Stack.Navigator>
  );
};

export default ListenNavigator;
