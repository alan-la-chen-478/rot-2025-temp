import React, {useState, useEffect, useCallback} from 'react';
import {FlatList, View, RefreshControl, Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getFullGlobalState, useGlobalSetter} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';
import ScreenHeader from '~components/layouts/ScreenHeader';
import TourDetail from '~components/TourDetail';
import LoadingIndicator from '~components/LoadingIndicator';
import Link from '~elements/Link';
import Html from '~elements/Html';
import Text from '~elements/Text';
import {objectSet, objectGet} from '~helpers/values';

const LoginHelpScreen = () => {
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [content, setContent] = useState(null);
  const globalState = getFullGlobalState();
  const setGlobalGlobal = useGlobalSetter('pages.help');

  const loadContent = async isRefresh => {
    let data = await Api('/pages/detail', {page: 'help'});

    if (data === false) {
      data = objectGet(globalState, 'pages.help');
      if (isRefresh || !data) {
        Alert.alert('Network Error', 'Internet Connection Required');
        return;
      }
    } else {
      setGlobalGlobal(data);
    }

    setContent(data.data?.content);
    setLoaded(true);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadContent(true);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      (async () => loadContent())();
    }, []),
  );

  return (
    <ScreenHeader
      headerText="Become a Customer"
      showBack
      scrollViewProps={{
        refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />,
      }}>
      {loaded ? (
        <View style={{padding: 10}}>
          <Html source={{html: content || ''}} />
        </View>
      ) : (
        <LoadingIndicator />
      )}
    </ScreenHeader>
  );
};

export default LoginHelpScreen;
