import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '~configs/colors';
import themes from '~configs/themes';
import Text from '~elements/Text';

const Input = props => {
  const {
    label,
    value,
    onChange,
    hidden,
    disabled,
    required,
    invalid,
    loading,
    style,
    labelStyle,
    labelProps,
    controlStyle,
    inputStyle,
    beforeLabel,
    afterLabel,
    beforeControl,
    afterControl,
    beforeInput,
    afterInput,
    setRef,
    ...rest
  } = props;

  const [isFocused, setIsFocused] = useState(rest.autoFocus);
  let editable = true;
  const dynamicStyles = [];
  const dynamicInputStyles = [];

  if (hidden) {
    return null;
  }

  if (disabled) {
    editable = false;
    dynamicStyles.push(styles.disabled);
    dynamicInputStyles.push(styles.disabledInput);
  }

  if (invalid) {
    dynamicStyles.push(styles.invalid);
    dynamicInputStyles.push(styles.invalidInput);
  }

  if (loading) {
    editable = false;
    dynamicStyles.push(styles.loading);
    dynamicInputStyles.push(styles.loadingInput);
  }

  if (disabled) {
    editable = false;
    dynamicStyles.push(styles.disabled);
    dynamicInputStyles.push(styles.disabledInput);
  }

  if (isFocused) {
    dynamicStyles.push(styles.focused);
    dynamicInputStyles.push(styles.focusedInput);
  }

  return (
    <View style={[styles.wrapper, ...dynamicStyles, style]}>
      <Text textStyle={[styles.label, labelStyle]} {...labelProps}>
        {beforeLabel}
        {label}
        {afterLabel}
      </Text>
      {beforeControl}
      <View style={[styles.control, controlStyle]}>
        {beforeInput}
        <TextInput
          {...{
            autoCapitalize: 'none',
            autocomplete: 'off',
            autoCorrect: false,
            editable: editable,
            onBlur: () => setIsFocused(false),
            onFocus: () => setIsFocused(true),
            placeholderTextColor: colors.lightGrey,
            returnKeyType: 'done',
            ...rest,
          }}
          style={[styles.input, ...dynamicInputStyles, inputStyle]}
          onChangeText={onChange}
          value={value}
          ref={setRef}
        />
        {afterInput}
      </View>
      {afterControl}
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {marginTop: 10},
  label: {
    letterSpacing: 0.5,
    color: colors.primary,
  },
  control: {},
  input: {
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 5,
    height: 35,
    paddingHorizontal: 10,
    paddingVertical: 0,
    fontSize: themes.inputFontSize,
    fontFamily: themes.baseFontFamily,
    color: colors.darkGrey,
  },
  invalidInput: {
    borderColor: colors.error,
  },
  disabledInput: {
    backgroundColor: colors.lightGrey,
  },
});

export default Input;
