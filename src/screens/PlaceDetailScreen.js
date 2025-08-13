import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Alert, RefreshControl} from 'react-native';
import ScreenHeader from '~components/layouts/ScreenHeader';
import LoadingIndicator from '~components/LoadingIndicator';
import PlaceDetail from '~components/PlaceDetail';
import {objectGet} from '~helpers/values';
import {getFullGlobalState, useGlobalSetter} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';

const PlaceDetailScreen = ({navigation, route}) => {
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [place, setPlace] = useState(null);
  const globalState = getFullGlobalState();
  const setGlobalGlobal = useGlobalSetter(`destinations.${route.params.id}`);

  const loadPlace = async isRefresh => {
    let data = await Api('/destinations/detail', {id: route.params.id});

    if (data === false) {
      data = objectGet(globalState, `destinations.${route.params.id}`);
      if (isRefresh || !data) {
        Alert.alert('Network Error', 'Internet Connection Required');
        return;
      }
    } else {
      setGlobalGlobal(data);
    }

    setPlace(data.data);
    setLoaded(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPlace(true);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => loadPlace())();
    }, [route.params.id]),
  );

  return (
    <ScreenHeader
      headerText="Place Detail"
      showBack
      scrollViewProps={{
        refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />,
      }}
    >
      {loaded ? <PlaceDetail place={place} /> : <LoadingIndicator />}
    </ScreenHeader>
  );
};

export default PlaceDetailScreen;
