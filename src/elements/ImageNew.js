import React, {useState, useEffect} from 'react';
import {View, Image as RNImage} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AutoHeightImage from 'react-native-auto-height-image';
import FastImage from 'react-native-fast-image';
import {apiDomain} from '~libraries/Api';

const ImageNew = ({style, width, height, source, ...props}) => {
  const imageUrl = (source.uri || source).replace('https://royaleorchidtours.test', apiDomain);
  const imageSource = source.uri ? {uri: imageUrl} : source;

  return <FastImage source={source} resizeMode={FastImage.resizeMode.contain} />;
};

const styles = EStyleSheet.create({
  wrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
});

export default ImageNew;
