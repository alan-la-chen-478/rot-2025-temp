import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatListsScreen from '~screens/ChatListsScreen';

const Stack = createNativeStackNavigator();

const ChatNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="ChatLists" component={ChatListsScreen} />
    </Stack.Navigator>
  );
};

export default ChatNavigator;
