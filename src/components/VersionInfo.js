import React, {useState} from 'react';
import {Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Loading from '~elements/Loading';
import Text from '~elements/Text';

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
