import React, {useState, useEffect} from 'react';
import {View, Image as RNImage} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AutoHeightImage from 'react-native-auto-height-image';
import {apiDomain} from '~libraries/Api';

const ImageOld = ({style, width, height, source, ...props}) => {
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [adjustedHeight, setAdjustedHeight] = useState(250);
  const [adjustedWidth, setAdjustedWidth] = useState('auto');

  const imageUrl = (source.uri || source).replace('https://royaleorchidtours.test', apiDomain);
  const imageSource = source.uri ? {uri: imageUrl} : source;

  useEffect(() => {
    if (!wrapperWidth) {
      return;
    }

    RNImage.getSize(imageUrl, (imageWidth, imageWHight) => {
      let newWidth, newHeight;

      if (width && !height) {
        newWidth = width;
        newHeight = imageWHight * (width / imageWidth);
      } else if (!width && height) {
        newWidth = imageWidth * (height / imageWHight);
        newHeight = height;
      } else {
        newWidth = imageWidth;
        newHeight = imageWHight;
      }

      if (wrapperWidth && newWidth > wrapperWidth) {
        newHeight = newHeight * (wrapperWidth / newWidth);
        newWidth = wrapperWidth;
      }

      setAdjustedHeight(newHeight);
      setAdjustedWidth(newWidth);
    });
  }, [wrapperWidth]);

  const onWrapperLayout = event => setWrapperWidth(event.nativeEvent.layout.width);

  return (
    <View style={[styles.wrapper, {height: adjustedHeight}]} onLayout={onWrapperLayout}>
      <RNImage source={imageSource} style={[style, {height: adjustedHeight, width: adjustedWidth}]} />
    </View>
  );
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

export default ImageOld;
