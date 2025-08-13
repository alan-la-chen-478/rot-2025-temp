import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

const Tags = ({style, children, evaluator, ...props}) => {
  return (
    <View style={[styles.wrapper, style]} {...props}>
      {children}
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginBottom: 5,
  },
});

export default Tags;
