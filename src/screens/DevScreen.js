import React, {useEffect, useState} from 'react';
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

const DevScreen = ({navigation}) => {
  const states = getFullGlobalState();
  const [appInfo, setAppInfo] = useState(null);

  useFocusEffect(() => {
    (async () => setAppInfo(await getDebugInfo()))();
  });

  return (
    <ScreenHeader headerText="Developer" containerStyle={{padding: 15}} showBack>
      <Text>Dev Screen</Text>
      <Button onPress={triggerJsError}>Test Error</Button>
      <Text>{JSON.stringify(appInfo, null, 4)}</Text>
      <Text>{JSON.stringify(states, null, 4)}</Text>
    </ScreenHeader>
  );
};

export default DevScreen;
