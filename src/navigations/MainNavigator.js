import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import colors from '~configs/colors';
import Icon from '~elements/Icon';
import {getGlobalState} from '~hooks/useGlobalContext';
import ChatNavigator from '~navigations/ChatNavigator';
import ListenNavigator from '~navigations/ListenNavigator';
import MoreNavigator from '~navigations/MoreNavigator';
import PlacesNavigator from '~navigations/PlacesNavigator';
import SpeakNavigator from '~navigations/SpeakNavigator';
import ToursNavigator from '~navigations/ToursNavigator';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const currentUser = getGlobalState('currentUser');

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        unmountOnBlur: true,
        tabBarStyle: {
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          paddingTop: 7,
          borderWidth: 1,
          borderBottomWidth: 0,
          borderColor: colors.grey,
        },
        // tabBarStyle: {height: Platform.OS == 'ios' ? 80 : 60},
        // tabBarItemStyle: {height: 50, flex: 1, alignItems: 'center'},
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          switch (route.name) {
            case 'Tours':
              iconName = 'map-marker';
              break;
            case 'Places':
              iconName = 'globe';
              break;
            case 'Listen':
              iconName = 'assistive-listening-systems';
              break;
            case 'Speak':
              iconName = 'volume-up';
              break;
            case 'Chat':
              iconName = 'whatsapp@brand';
              break;
            case 'More':
              iconName = 'bars';
              break;
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.secondary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Tours" component={ToursNavigator} />
      {currentUser.user_type == 'user' && <Tab.Screen name="Places" component={PlacesNavigator} />}
      {currentUser.user_type == 'user' && <Tab.Screen name="Listen" component={ListenNavigator} />}
      {currentUser.user_type != 'user' && <Tab.Screen name="Speak" component={SpeakNavigator} />}
      {currentUser.user_type != 'tour_guide' && <Tab.Screen name="Chat" component={ChatNavigator} />}
      <Tab.Screen name="More" component={MoreNavigator} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
