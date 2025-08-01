import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Text from '~elements/Text';
import colors from '~configs/colors';

const Divider = ({style, dividerStyle, color, width, text, textStyle}, props) => {
  const dividerStyles = [
    styles.divider,
    dividerStyle,
    color ? {backgroundColor: color} : null,
    width ? {width: width / 2} : null,
  ];

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <View style={dividerStyles} />
      {text && text.length > 0 && <Text textStyle={[styles.text, textStyle]}>{text}</Text>}
      <View style={dividerStyles} />
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginHorizontal: 5,
    textTransform: 'uppercase',
    lineHeight: null,
  },
  divider: {
    width: 90,
    height: 1,
    backgroundColor: colors.darkGrey,
  },
});

export default Divider;
