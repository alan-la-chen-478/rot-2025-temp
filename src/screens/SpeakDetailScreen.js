import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Alert, RefreshControl} from 'react-native';
import ScreenHeader from '~components/layouts/ScreenHeader';
import LoadingIndicator from '~components/LoadingIndicator';
import SpeakDetail from '~components/SpeakDetail';
import {getGlobalState} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';

const SpeakDetailScreen = ({navigation, route}) => {
  const currentUser = getGlobalState('currentUser');
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tokenInfo, setTokenInfo] = useState(null);

  const room = route.params.room;

  const loadTokenInfo = async () => {
    const data = await Api('/streams/token', {
      agora_room_id: room.agora_room_id,
      agora_speaker: currentUser.user_type != 'user',
    });

    if (data === false) {
      Alert.alert('Network Error', 'Internet Connection Required');
      return;
    }

    if (!data.success) {
      Alert.alert('Error', data.data.message);
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
      {loaded ? <SpeakDetail tokenInfo={tokenInfo} room={room} /> : <LoadingIndicator />}
    </ScreenHeader>
  );
};

export default SpeakDetailScreen;
