import React, {useState} from 'react';
import {Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Text from '~elements/Text';
import Loading from '~elements/Loading';
import colors from '~configs/colors';

const Link = ({children, disabled, loading, theme, style, textStyle, textProps, ...props}) => {
  const dynamicStyles = [styles.wrapper, style];
  const dynamicTextStyles = [styles.text, textStyle];

  if (disabled) {
    dynamicStyles.push(styles.disabled);
    dynamicTextStyles.push(styles.disabledText);
  }

  return (
    <Pressable disabled={disabled} style={dynamicStyles} {...props}>
      <Text textStyle={dynamicTextStyles} {...textProps}>
        {loading ? <Loading size="small" /> : children}
      </Text>
    </Pressable>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    paddingHorizontal: 5,
    marginVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
    color: colors.primary,
  },
  disabled: {
    backgroundColor: colors.grey,
  },
  disabledText: {
    color: colors.darkGrey,
  },
});

export default Link;
