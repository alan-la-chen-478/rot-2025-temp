import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Base = ({style, ...props}) => {
  return <View style={[styles.wrapper, style]} {...props} />;
};

const styles = EStyleSheet.create({
  wrapper: {},
});

export default Base;
