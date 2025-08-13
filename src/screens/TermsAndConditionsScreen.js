import {useFocusEffect} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {Alert, RefreshControl, View} from 'react-native';
import ScreenHeader from '~components/layouts/ScreenHeader';
import LoadingIndicator from '~components/LoadingIndicator';
import Html from '~elements/Html';
import {objectGet} from '~helpers/values';
import {getFullGlobalState, useGlobalSetter} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';

const TermsAndConditionsScreen = () => {
  const [loaded, setLoaded] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [content, setContent] = useState(null);
  const globalState = getFullGlobalState();
  const setGlobalGlobal = useGlobalSetter('pages.tac');

  const loadContent = async isRefresh => {
    const data = await Api('/pages/detail', {page: 'tac'});

    if (data === false) {
      data = objectGet(globalState, 'pages.tac');
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
      headerText="Terms and Conditions"
      showBack
      scrollViewProps={{
        refreshControl: <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />,
      }}
    >
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

export default TermsAndConditionsScreen;
