import React, {useState, useEffect, useRef} from 'react';
import {View, Pressable, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {Audio} from 'expo-av';
import {apiDomain} from '~libraries/Api';
import LoadingIndicator from '~components/LoadingIndicator';
import Text from '~elements/Text';
import Icon from '~elements/Icon';
import Loading from '~elements/Loading';
import {urlReplace} from '~helpers/app';
import colors from '~configs/colors';

const AudioPlayer = ({mp3, style, label, ...props}) => {
  const [sound, setSound] = useState(null);
  const [loading, setLoading] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  const src = urlReplace(mp3);

  const play = async () => {
    try {
      setLoading(true);
      const {sound: playbackObject} = await Audio.Sound.createAsync({uri: src}, {shouldPlay: true});
      setLoading(false);

      setSound(playbackObject);
      setPlaying(true);
      setPaused(false);
    } catch (error) {
      console.log(error);
    }
  };

  const pause = async () => {
    try {
      await sound.pauseAsync();
    } catch (error) {
      console.log(error);
    }
    setPaused(true);
  };

  const unpause = async () => {
    try {
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
    setPaused(false);
  };

  const stop = async () => {
    try {
      await sound.stopAsync();
    } catch (error) {
      console.log(error);
    }
    setPlaying(false);
    setPaused(false);
  };

  useEffect(() => {
    return async () => {
      return sound ? () => sound.unloadAsync() : undefined;
    };
  });

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <View style={styles.label}>
        <Text bold>{label}: </Text>
      </View>
      <View style={styles.controls}>
        {!playing && (
          <Pressable onPress={play} style={styles.control}>
            <Icon name="play" color={colors.maintext} />
          </Pressable>
        )}
        {loading && <Loading size="small" />}
        {playing && !paused && (
          <Pressable onPress={pause} style={styles.control}>
            <Icon name="pause" color={colors.maintext} />
          </Pressable>
        )}
        {playing && paused && (
          <Pressable onPress={unpause} style={styles.control}>
            <Icon name="play" color={colors.maintext} />
          </Pressable>
        )}
        {playing && (
          <Pressable onPress={stop} style={styles.control}>
            <Icon name="stop" color={colors.maintext} />
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  label: {
    minWidth: 100,
  },
  controls: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  control: {
    marginLeft: 5,
    width: 25,
    height: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
  },
});

export default AudioPlayer;
