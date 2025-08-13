import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Alert, FlatList, RefreshControl, ScrollView} from 'react-native';
import ScreenHeader from '~components/layouts/ScreenHeader';
import LoadingIndicator from '~components/LoadingIndicator';
import TourBox from '~components/TourBox';
import Text from '~elements/Text';
import {objectGet} from '~helpers/values';
import {getFullGlobalState, useGlobalSetter} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';

const ToursListScreen = ({navigation}) => {
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tours, setTours] = useState([]);
  const globalState = getFullGlobalState();
  const setGlobalGlobal = useGlobalSetter('tour_plans.list');

  const loadTours = async isRefresh => {
    let data = await Api('/tour-plans/list');

    if (data === false) {
      data = objectGet(globalState, 'tour_plans.list');
      if (isRefresh || !data) {
        Alert.alert('Network Error', 'Internet Connection Required');
        return;
      }
    } else {
      setGlobalGlobal(data);
    }

    setTours(data.data);
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
    <ScreenHeader noScroll headerText="My Tours">
      {loaded ? (
        tours.length > 0 ? (
          <FlatList
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={tours}
            renderItem={({item, index}) => <TourBox tour={item} />}
            keyExtractor={item => item.id}
          />
        ) : (
          <ScrollView contentContainerStyle={{padding: 15}} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Text>No active tours available at the moment</Text>
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

export default ToursListScreen;
