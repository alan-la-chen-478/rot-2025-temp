import NetInfo from '@react-native-community/netinfo';
import {create} from 'apisauce';
import {getConfig} from '~helpers/app';

export const apiClient = create({
  baseURL: `${getConfig('api.protocol')}://${getConfig('api.domain')}/rot-api`,
  headers: {
    'x-rot-app-version': '',
    'x-rot-app-patch': '',
    'x-rot-app-source': '',
    'x-rot-device-token': '',
    'x-rot-auth-token': '',
  },
});

export const api = async (url, postData) => {
  const netInfo = await NetInfo.fetch();

  if (!netInfo.isConnected) {
    return false;
  }

  // console.log(url);
  return apiClient.post(url, postData).then(({ok, problem, status, data}) => {
    // console.log(data);
    // 401 then logout
    return data;
  });
};

export default api;
