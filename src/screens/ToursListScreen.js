import React, {useState, useEffect, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {FlatList, ScrollView, RefreshControl, Alert} from 'react-native';
import {getFullGlobalState, useGlobalSetter} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';
import ScreenHeader from '~components/layouts/ScreenHeader';
import TourBox from '~components/TourBox';
import LoadingIndicator from '~components/LoadingIndicator';
import Link from '~elements/Link';
import Text from '~elements/Text';
import {objectSet, objectGet} from '~helpers/values';

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
          <ScrollView
            contentContainerStyle={{padding: 15}}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            <Text>No active tours available at the moment</Text>
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

export default ToursListScreen;
