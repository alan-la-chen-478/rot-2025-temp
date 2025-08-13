import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '~configs/colors';
import Text from '~elements/Text';

const TextError = ({children, textStyle, ...props}) => {
  return (
    <Text textStyle={[styles.text, textStyle]} {...props}>
      {children}
    </Text>
  );
};

const styles = EStyleSheet.create({
  text: {
    color: colors.error,
  },
});

export default TextError;
