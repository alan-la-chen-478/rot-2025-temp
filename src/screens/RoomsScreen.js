import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, ScrollView, RefreshControl, Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getFullGlobalState, useGlobalSetter} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';
import ScreenHeader from '~components/layouts/ScreenHeader';
import StreamBox from '~components/StreamBox';
import LoadingIndicator from '~components/LoadingIndicator';
import Link from '~elements/Link';
import Text from '~elements/Text';
import {objectSet, objectGet} from '~helpers/values';

const RoomsScreen = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [rooms, setRooms] = useState([]);
  const globalState = getFullGlobalState();
  const setGlobalGlobal = useGlobalSetter('streams.list');

  const loadTours = async isRefresh => {
    let data = await Api('/streams/list');

    if (data === false) {
      data = objectGet(globalState, 'streams.list');
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
      (async () => await loadTours())();
    }, []),
  );

  return (
    <ScreenHeader noScroll headerText="Live Streams">
      {loaded ? (
        rooms.length > 0 ? (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={rooms}
            renderItem={({item}) => <StreamBox stream={item} />}
            keyExtractor={(item, index) => index}
          />
        ) : (
          <ScrollView
            contentContainerStyle={{padding: 15}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Text>No streams available at the moment</Text>
          </ScrollView>
        )
      ) : (
        <ScrollView
          contentContainerStyle={{padding: 15}}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
          <LoadingIndicator />
        </ScrollView>
      )}
    </ScreenHeader>
  );
};

export default RoomsScreen;
