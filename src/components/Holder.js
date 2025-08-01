import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Holder = ({children, valign, halign, style}, props) => {
  return (
    <View style={[styles.wrapper, style]} {...props}>
      {children}
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    alignItems: 'center',
  },
});

export default Holder;
