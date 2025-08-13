import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {activateKeepAwakeAsync, deactivateKeepAwake} from 'expo-keep-awake';
import React, {useCallback, useState} from 'react';
import {Alert, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {themed} from '~configs/colors';
import Button from '~elements/Button';
import Text from '~elements/Text';
import {createClient} from '~helpers/agora';
import Api from '~libraries/Api';
import Notifee from '~libraries/Notifee';

const AgoraStream = ({tokenInfo, room, style, ...props}) => {
  const navigation = useNavigation();
  const [connected, setConnected] = useState(false);
  const [hasStats, setHasStats] = useState(false);
  const [hostsCount, setHostsCount] = useState(0);
  const [isMute, setIsMute] = useState(false);
  const client = createClient();
  const isHost = tokenInfo.speaker;

  const toggleMute = async () => {
    console.log(isMute);
    await client.client().enableLocalAudio(isMute);
  };

  useFocusEffect(
    useCallback(() => {
      const interval = setInterval(async () => {
        const data = await Api('/streams/status', {
          agora_room_id: tokenInfo.room_id,
        });

        if (!data.success || !data.data.available) {
          await Notifee.stop();
          clearInterval(interval);
          client.destroy();
          Alert.alert('Error', 'Room has expired', [{text: 'Back', onPress: () => navigation.goBack()}]);
        }
      }, 5000);

      (async () => {
        await Notifee.start(room.location);
        await activateKeepAwakeAsync();
        await client.init();

        client.client().addListener('onJoinChannelSuccess', () => {
          setConnected(true);
        });

        client.client().addListener('onRtcStats', (con, {userCount}) => {
          setHasStats(true);
          setHostsCount(isHost ? userCount : userCount - 1);
        });

        client.client().addListener('onLocalAudioStateChanged', (conn, state, error) => setIsMute(!state));

        const status = await client.join(tokenInfo);
      })();

      return () => {
        deactivateKeepAwake();
        clearInterval(interval);
        client.destroy();
        (async () => await Notifee.stop())();
      };
    }, [tokenInfo]),
  );

  return (
    <View style={[styles.wrapper, style]}>
      <View style={styles.circle}>
        {connected ? (
          <>
            {isHost && isMute && <Text style={styles.muteText}>You are muted.</Text>}
            <Text style={styles.mainText}>Connected</Text>
            <Text style={styles.hostsCount}>Speakers: {hostsCount}</Text>
          </>
        ) : (
          <Text style={styles.mainText}>Connecting...</Text>
        )}
      </View>

      {connected && hasStats && hostsCount === 0 && <Text style={styles.hostsNotice}>(No speakers have connected yet.)</Text>}
      {connected && hasStats && isHost && <Text style={styles.hostsNotice}>(You are a speaker.)</Text>}
      {connected && hasStats && isHost && <Button onPress={toggleMute}>{isMute ? 'Speak' : 'Mute'}</Button>}
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderColor: themed.primary,
    borderWidth: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themed.lightSecondary,
  },
  mainText: {
    fontSize: 24,
    marginBottom: 5,
  },
  hostsNotice: {
    fontSize: 12,
    marginTop: 25,
  },
  muteText: {
    fontSize: 12,
    marginBottom: 5,
  },
});

export default AgoraStream;
