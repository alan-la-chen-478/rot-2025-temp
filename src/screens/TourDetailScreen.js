import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Alert, RefreshControl} from 'react-native';
import ScreenHeader from '~components/layouts/ScreenHeader';
import LoadingIndicator from '~components/LoadingIndicator';
import TourDetail from '~components/TourDetail';
import {objectGet} from '~helpers/values';
import {getFullGlobalState, useGlobalSetter} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';

const TourDetailScreen = ({navigation, route}) => {
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [tour, setTour] = useState(null);
  const [tourPlan, setTourPlan] = useState(null);
  const globalState = getFullGlobalState();
  const setGlobalGlobal = useGlobalSetter(`tour_plans.${route.params.id}`);

  const loadInfo = async isRefresh => {
    let data = await Api('/tour-plans/detail', {id: route.params.id});

    if (data === false) {
      data = objectGet(globalState, `tour_plans.${route.params.id}`);
      if (isRefresh || !data) {
        Alert.alert('Network Error', 'Internet Connection Required');
        return;
      }
    } else {
      setGlobalGlobal(data);
    }

    const {tour, ...plan} = data.data;
    setTourPlan(plan);
    setTour(tour);
    setLoaded(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadInfo(true);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => loadInfo())();
    }, [route.params.id]),
  );

  return (
    <ScreenHeader
      headerText="Tour Details"
      showBack
      scrollViewProps={{
        refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />,
      }}
    >
      {loaded ? <TourDetail tour={tour} tourPlan={tourPlan} /> : <LoadingIndicator />}
    </ScreenHeader>
  );
};

export default TourDetailScreen;
