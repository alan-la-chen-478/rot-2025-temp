import React, {useState, useEffect} from 'react';
import {FlatList, View, RefreshControl} from 'react-native';
import {useGlobalState} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';
import ScreenHeader from '~components/layouts/ScreenHeader';
import TourDetail from '~components/TourDetail';
import LoadingIndicator from '~components/LoadingIndicator';
import Link from '~elements/Link';
import Text from '~elements/Text';

const SettingScreen = ({navigation, route}) => {
  return <ScreenHeader headerText="Settings" showBack />;
};

export default SettingScreen;
