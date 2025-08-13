import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Alert, RefreshControl} from 'react-native';
import ScreenHeader from '~components/layouts/ScreenHeader';
import LoadingIndicator from '~components/LoadingIndicator';
import RoomDetail from '~components/RoomDetail';
import Api from '~libraries/Api';

const RoomDetailScreen = ({navigation, route}) => {
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(null);

  const room = route.params.room;

  const loadTokenInfo = async () => {
    let data = await Api('/streams/token', {agora_room_id: room.agora_room_id});

    if (data === false) {
      if (!data) {
        Alert.alert('Network Error', 'Internet Connection Required');
        return;
      }
    }

    if (!data.success) {
      Alert.alert('Error', 'Room has expired', [{text: 'Back', onPress: () => navigation.goBack()}]);
      return;
    }

    setTokenInfo(data.data);
    setLoaded(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadTokenInfo();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => loadTokenInfo())();
    }, [route.params.room]),
  );

  return (
    <ScreenHeader
      headerText={room.location}
      showBack
      scrollViewProps={{
        refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />,
      }}
    >
      {loaded ? <RoomDetail tokenInfo={tokenInfo} room={room} /> : <LoadingIndicator />}
    </ScreenHeader>
  );
};

export default RoomDetailScreen;
