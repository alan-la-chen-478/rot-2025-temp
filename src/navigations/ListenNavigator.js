import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RoomDetailScreen from '~screens/RoomDetailScreen';
import RoomsScreen from '~screens/RoomsScreen';

const Stack = createNativeStackNavigator();

const ListenNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AllRooms" component={RoomsScreen} />
      <Stack.Screen name="RoomDetail" component={RoomDetailScreen} />
    </Stack.Navigator>
  );
};

export default ListenNavigator;
