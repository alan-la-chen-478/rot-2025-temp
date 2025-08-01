import React from 'react';
import {View, Image} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import DevPanelPressable from '~components/DevPanelPressable';
// import TextLogo from '~assets/images/logo-with-text.png';

const LogoWithText = ({imageProps, style, imageStyle}, props) => {
  return (
    <DevPanelPressable style={[styles.wrapper, style]} {...props}>
      <Image
        source={require('~assets/images/logo-with-text.png')}
        style={[{width: 240, height: (240 * 151) / 784}]}
        resizeMode="contain"
      />
    </DevPanelPressable>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    // width: 240,
  },
});

export default LogoWithText;
