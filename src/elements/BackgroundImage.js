import React from 'react';
import {ImageBackground, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {urlReplace} from '~helpers/app';

const BackgroundImage = ({style, source, ...props}) => {
  const imageSource = source.uri ? {uri: urlReplace(source.uri)} : source;

  return (
    <View style={[styles.wrapper, style]}>
      <ImageBackground source={imageSource} resizeMode="cover" style={styles.image}></ImageBackground>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default BackgroundImage;
