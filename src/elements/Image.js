import React, {useState, useEffect, createRef} from 'react';
import {View, Image as RNImage} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AutoHeightImage from 'react-native-auto-height-image';
import {apiDomain} from '~libraries/Api';
import {urlReplace} from '~helpers/app';

const Image = ({style, width, height, source, ...props}) => {
  const isMounted = React.createRef(null);
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [adjustedHeight, setAdjustedHeight] = useState(150);
  const [adjustedWidth, setAdjustedWidth] = useState('auto');

  const imageUrl = typeof source?.uri == 'string' ? urlReplace(source.uri) : '';
  const imageSource = source.uri ? {uri: imageUrl} : source;

  useEffect(() => {
    isMounted.current = true;

    if (!wrapperWidth) {
      return;
    }

    if (imageUrl) {
      RNImage.getSize(imageUrl, (imageWidth, imageWHight) => {
        if (!isMounted.current) {
          return;
        }

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
    }

    return () => {
      isMounted.current = false;
    };
  }, [wrapperWidth]);

  const onWrapperLayout = event =>
    setWrapperWidth(event.nativeEvent.layout.width);

  return (
    <View
      style={[styles.wrapper, {height: adjustedHeight}]}
      onLayout={onWrapperLayout}>
      <RNImage
        source={imageSource}
        style={[style, {height: adjustedHeight, width: adjustedWidth}]}
      />
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

export default Image;
