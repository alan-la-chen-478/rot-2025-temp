import {useEffect, useState} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import RtcEngine, {ChannelProfile, ClientRole} from 'react-native-agora';
import {getConfig} from '~helpers/app';

const useAgoraClient = isSpeaker => {
  let [client, setClient] = useState(null);

  useEffect(() => {
    (async () => {
      let granted = true;

      if (Platform.OS === 'android') {
        const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO);
        granted = result === PermissionsAndroid.RESULTS.GRANTED;
      }

      if (!granted) {
        return;
      }

      agoraClient = await RtcEngine.create(getConfig('agora.app_id'));
      console.log(agoraClient);
      agoraClient.addListener('UserJoined', (...args) => console.log('UserJoined', args));
      agoraClient.addListener('UserOffline', (...args) => console.log('UserOffline', args));
      agoraClient.addListener('JoinChannelSuccess', (...args) => console.log('JoinChannelSuccess', args));
      agoraClient.addListener('LeaveChannel', (...args) => console.log('LeaveChannel', args));

      await agoraClient.enableAudio();
      await agoraClient.setChannelProfile(ChannelProfile.LiveBroadcasting);
      await agoraClient.setClientRole(isSpeaker ? ClientRole.Broadcaster : ClientRole.Audience);

      setClient(agoraClient);
    })();
  }, []);

  return client;
};

export default useAgoraClient;
