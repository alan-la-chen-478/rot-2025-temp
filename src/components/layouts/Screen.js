import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ScreenBase from '~components/layouts/ScreenBase';
import colors from '~configs/colors';

const Screen = ({children, ...props}) => {
  return (
    <ScreenBase {...props}>
      <View style={styles.view}>{children}</View>
    </ScreenBase>
  );
};

const styles = EStyleSheet.create({
  view: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Screen;
