import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Alert, FlatList, RefreshControl, ScrollView} from 'react-native';
import ChatBox from '~components/ChatBox';
import ScreenHeader from '~components/layouts/ScreenHeader';
import LoadingIndicator from '~components/LoadingIndicator';
import Text from '~elements/Text';
import {objectGet} from '~helpers/values';
import {getFullGlobalState, useGlobalSetter} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';

const ChatListsScreen = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [rooms, setRooms] = useState([]);
  const globalState = getFullGlobalState();
  const setGlobalGlobal = useGlobalSetter('chats.list');

  const loadTours = async isRefresh => {
    let data = await Api('/chats/list', {filters: 'all'});

    if (data === false) {
      data = objectGet(globalState, 'chats.list');
      if (isRefresh || !data) {
        Alert.alert('Network Error', 'Internet Connection Required');
        return;
      }
    } else {
      setGlobalGlobal(data);
    }

    setRooms(data.data);
    setLoaded(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTours(true);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => loadTours())();
    }, []),
  );

  return (
    <ScreenHeader noScroll headerText="Chat Groups">
      {loaded ? (
        rooms.length > 0 ? (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={rooms}
            renderItem={({item, index}) => <ChatBox tour={item} />}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <ScrollView contentContainerStyle={{padding: 15}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Text>No chat rooms available at the moment</Text>
          </ScrollView>
        )
      ) : (
        <ScrollView contentContainerStyle={{padding: 15}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <LoadingIndicator />
        </ScrollView>
      )}
    </ScreenHeader>
  );
};

export default ChatListsScreen;
