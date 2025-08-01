import React, {useState, useEffect} from 'react';
import {Pressable, Platform, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';
import Loading from '~elements/Loading';
import Text from '~elements/Text';
import colors from '~configs/colors';
import {dropShadow} from '~configs/themes';
import {getConfig} from '~helpers/app';

const VersionInfo = ({style, textStyle, ...props}) => {
  const [checking, setChecking] = useState(false);

  return (
    <Pressable style={[styles.wrapper, style]} {...props} onPress={() => {}}>
      <Text bold textStyle={[styles.label, textStyle]}>
        {checking && <Loading size="small" />}
      </Text>
    </Pressable>
  );
};

const styles = EStyleSheet.create({
  label: {
    textAlign: 'center',
    fontSize: 12,
  },
});

export default VersionInfo;
