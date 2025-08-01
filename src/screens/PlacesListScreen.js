import React, {useState, useEffect, useCallback} from 'react';
import {ScrollView, FlatList, View, Alert, RefreshControl} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getFullGlobalState, useGlobalSetter} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';
import ScreenHeader from '~components/layouts/ScreenHeader';
import PlaceBox from '~components/PlaceBox';
import LoadingIndicator from '~components/LoadingIndicator';
import Link from '~elements/Link';
import Text from '~elements/Text';
import {objectSet, objectGet} from '~helpers/values';

const PlacesListScreen = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [places, setPlaces] = useState([]);
  const globalState = getFullGlobalState();
  const setGlobalGlobal = useGlobalSetter('destinations.list');

  const loadPlaces = async isRefresh => {
    let data = await Api('/destinations/list');

    if (data === false) {
      data = objectGet(globalState, 'destinations.list');
      if (isRefresh || !data) {
        Alert.alert('Network Error', 'Internet Connection Required');
        return;
      }
    } else {
      setGlobalGlobal(data);
    }

    setPlaces(data.data);
    setLoaded(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPlaces(true);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => loadPlaces())();
    }, []),
  );

  return (
    <ScreenHeader noScroll headerText="Places">
      {loaded ? (
        <FlatList
          refreshing={refreshing}
          onRefresh={onRefresh}
          data={places}
          numColumns={2}
          renderItem={({item, index}) => <PlaceBox place={item} style={{flex: 1 / 2}} />}
          keyExtractor={item => item.id}
        />
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

export default PlacesListScreen;
