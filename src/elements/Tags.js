import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Text from '~elements/Text';
import colors from '~configs/colors';
import themes from '~configs/themes';

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
