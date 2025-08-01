import React, {useState} from 'react';
import {Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Text from '~elements/Text';
import Loading from '~elements/Loading';
import colors from '~configs/colors';

const Button = ({children, disabled, loading, theme, style, textStyle, textProps, ...props}) => {
  const dynamicStyles = [styles.wrapper, getTheme(theme).button, style];
  const dynamicTextStyles = [styles.text, getTheme(theme).text, textStyle];

  if (disabled) {
    dynamicStyles.push(styles.disabled);
    dynamicTextStyles.push(styles.disabledText);
  }

  return (
    <Pressable disabled={disabled} style={dynamicStyles} {...props}>
      <Text textStyle={dynamicTextStyles} {...textProps}>
        {loading ? <Loading size="small" color={getTheme(theme).text.color} /> : children}
      </Text>
    </Pressable>
  );
};

const getTheme = theme => {
  switch (theme) {
    default:
      return {
        text: {
          color: colors.white,
        },
        button: {
          backgroundColor: colors.primary,
        },
      };
  }
};

const styles = EStyleSheet.create({
  wrapper: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.red,
    color: colors.white,
    marginVertical: 5,
    borderRadius: 5,
    width: 180,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  disabled: {
    backgroundColor: colors.grey,
  },
  disabledText: {
    color: colors.darkGrey,
  },
});

export default Button;
