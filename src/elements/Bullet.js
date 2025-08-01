import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Text from '~elements/Text';
import Icon from '~elements/Icon';
import colors from '~configs/colors';
import themes from '~configs/themes';

const Bullet = ({children, textStyle, iconStyle, icon = 'check-circle', ...props}) => {
  return (
    <View style={[styles.wrapper]}>
      <View style={[styles.wrapperIcon]}>
        <Icon name={icon} style={iconStyle} />
      </View>

      <View style={[styles.wrapperText]}>
        <Text textStyle={[styles.text, textStyle]} {...props}>
          {children}
        </Text>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {flexDirection: 'row', marginBottom: 5},
  wrapperIcon: {flexDirection: 'row', paddingTop: 3, marginRight: 10},
  wrapperText: {flex: 1},
  text: {lineHeight: 16, paddingTop: 5},
});

export default Bullet;
