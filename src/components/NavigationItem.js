import React from 'react';
import {Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';
import Text from '~elements/Text';
import colors from '~configs/colors';
import {dropShadow} from '~configs/themes';

const NavigationItem = ({action, label, screen, style, textStyle, ...props}) => {
  const navigation = useNavigation();

  const onPress = () => {
    return action ? action() : navigation.navigate(screen);
  };

  return (
    <Pressable style={[styles.wrapper, style]} {...props} onPress={onPress}>
      <Text bold textStyle={[styles.label, textStyle]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    backgroundColor: colors.white,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 5,
    ...dropShadow,
  },
});

export default NavigationItem;
