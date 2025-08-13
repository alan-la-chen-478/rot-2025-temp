import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '~configs/colors';
import Text from '~elements/Text';

const Tag = ({children, style, textStyle, background, color, textProps, evaluator, ...props}) => {
  if (evaluator == false || evaluator === undefined || (evaluator && evaluator.length == 0)) {
    return null;
  }

  return (
    <View style={[styles.wrapper, background ? {backgroundColor: background} : null, style]} {...props}>
      <Text textStyle={[styles.text, color ? {color} : null, textStyle]} {...textProps}>
        {children}
      </Text>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    flex: 0,
    paddingHorizontal: 5,
    borderRadius: 5,
    backgroundColor: colors.lightGrey,
    marginRight: 5,
  },
  text: {
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: colors.maintext,
  },
});

export default Tag;
