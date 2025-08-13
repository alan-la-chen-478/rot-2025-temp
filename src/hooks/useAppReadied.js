import {useEffect, useState} from 'react';
import {Alert, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {getConfig} from '~helpers/app';
import {getGlobalState, useGlobalState} from '~hooks/useGlobalContext';
import useNetworkListener from '~hooks/useNetworkListener';
import Api, {apiClient} from '~libraries/Api';

const useAppReadied = () => {
  const [readied, setReadied] = useState(false);
  const [deviceToken, setDeviceToken] = useGlobalState('deviceToken');
  const usingInitialState = getGlobalState('usingInitialState');
  const accessToken = getGlobalState('accessToken');
  const apiUrl = getGlobalState('apiUrl');

  useNetworkListener();

  useEffect(() => {
    if (usingInitialState) {
      return;
    }

    (async () => {
      let tokenValid = false;

      if (apiUrl.length > 0) {
        apiClient.setBaseURL(apiUrl);
      }

      apiClient.setHeader('x-rot-app-source', getConfig('api.source'));
      apiClient.setHeader('x-rot-device-token', deviceToken);
      apiClient.setHeader('x-rot-auth-token', accessToken);

      if (deviceToken) {
        const validateToken = await Api('/devices/verify', {
          device_token: deviceToken,
        });

        if (!validateToken || validateToken.success) {
          tokenValid = true;
        }
      }

      if (!deviceToken || !tokenValid) {
        const response = await Api('/devices/register', {
          unique_id: await DeviceInfo.syncUniqueId(),
          base_os: Platform.OS,
          brand: await DeviceInfo.getBrand(),
          device_id: await DeviceInfo.getDeviceId(),
          device_type: await DeviceInfo.getDeviceType(),
        });

        if (response === false) {
          Alert.alert('Network Error', 'Internet connection required for initial setup');
          return;
        }

        setDeviceToken(response.data.device_token);
        apiClient.setHeader('x-rot-device-token', response.data.device_token);
      }

      await new Promise(re => setTimeout(re, 500));

      setReadied(true);
    })();
  }, [usingInitialState]);

  return readied;
};

export default useAppReadied;
