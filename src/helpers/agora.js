import {useEffect, useRef} from 'react';
import {Platform, PermissionsAndroid} from 'react-native';
import {
  createAgoraRtcEngine,
  ChannelProfile,
  AgoraClientRole,
  RtcEngineContext,
} from 'react-native-agora';
import {getConfig} from '~helpers/app';

export const createClient = () => {
  const engine = useRef();

  const requestCameraAndAudioPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ]);
      if (
        granted['android.permission.RECORD_AUDIO'] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.CAMERA'] ===
          PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('You can use the cameras & mic');
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  let _logger = (...args) => console.info(...args);

  return {
    client: () => engine.current,

    setLogger: log => (_logger = logger),

    init: async () => {
      if (Platform.OS === 'android') {
        await requestCameraAndAudioPermission();
      }

      engine.current = await createAgoraRtcEngine();
      engine.current.initialize({appId: getConfig('agora.app_id')});

      // engine.current = await RtcEngine.createWithContext(new RtcEngineContext(getConfig('agora.app_id')));
      await engine.current.setParameters('{"che.audio.opensl":true}');

      engine.current?.addListener('onError', errorCode => {
        _logger('Error', errorCode);
      });
      // engine.current.addListener('JoinChannelSuccess', (channel, uid, elapsed) => {
      //   _logger('JoinChannelSuccess', channel, uid, elapsed);
      // });
      // engine.current.addListener('LeaveChannel', stats => {
      //   _logger('LeaveChannel', stats);
      // });
      // engine.current.addListener('AudioVolumeIndication', (speakers, totalValume) => {
      //   _logger('AudioVolumeIndication', speakers, totalValume);
      // });
      // engine.current.addListener('ActiveSpeaker', uid => {
      //   _logger('ActiveSpeaker', uid);
      // });
      // engine.current.addListener('RtcStats', ({userCount}) => {
      //   console.info('RtcStats', {userCount});
      // });
      await engine.current.enableAudioVolumeIndication(250, 5, false);
    },

    join: async tokenInfo => {
      await engine.current?.enableAudio();
      await engine.current?.setChannelProfile(1);
      await engine.current?.setClientRole(tokenInfo.speaker ? 1 : 2);

      return await engine.current?.joinChannel(
        tokenInfo.token,
        tokenInfo.room_id,
        tokenInfo.user_id,
      );
    },

    destroy: async () => {
      await engine.current?.leaveChannel();
    },
  };
};
