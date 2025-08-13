import React, {useEffect, useState} from 'react';
import * as Updates from 'expo-updates';
import Constants from 'expo-constants';
import {Alert} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {getFullGlobalState} from '~hooks/useGlobalContext';
import ScreenHeader from '~components/layouts/ScreenHeader';
import Holder from '~components/Holder';
import Link from '~elements/Link';
import Text from '~elements/Text';
import Button from '~elements/Button';
import {getDebugInfo} from '~helpers/debug';
import {getConfig} from '~helpers/app';
import * as config from '~configs/app';

const DevScreen = ({navigation}) => {
  const extra = Constants.expoConfig.extra;
  const states = getFullGlobalState();

  useFocusEffect(() => {
    (async () => setAppInfo(await getDebugInfo()))();
  });

  const checkForUpdate = async () => {
    try {
      const result = await Updates.checkForUpdateAsync();

      if (result.isAvailable) {
        await Updates.fetchUpdateAsync();

        alert('Update your app for new features and bug fixes', {
          title: 'App Update Avaliable',
          cancelText: 'Later',
          confirmText: 'Update Now',
          onConfirm: () => Updates.reloadAsync(),
        });
      } else {
        alert('You are already on the latest patch', {title: 'Up to Date', confirmOnly: true});
      }
    } catch (error) {
      alert(`An error occurred: ${error.message}`, {confirmOnly: true});
    } finally {
      setChecking(false);
    }
  };

  return (
    <ScreenHeader headerText="Developer" containerStyle={{padding: 15}} showBack>
      <Text>Dev Screen</Text>
      <Button onPress={checkForUpdate}>Check For Update</Button>
      <Text>{JSON.stringify(extra, null, 4)}</Text>
      <Text>{JSON.stringify(config, null, 4)}</Text>
    </ScreenHeader>
  );
};

export default DevScreen;
