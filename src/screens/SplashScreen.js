import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Screen from '~components/layouts/Screen';
import LoadingIndicator from '~components/LoadingIndicator';
import Holder from '~components/Holder';
import LogoWithText from '~components/LogoWithText';
import Link from '~elements/Link';
import Text from '~elements/Text';
import colors from '~configs/colors';

const SplashScreen = ({navigation}) => {
  return (
    <Screen>
      <LogoWithText style={styles.logo} />
      <LoadingIndicator />
    </Screen>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    backgroundColor: colors.lightSecondary,
  },
  logo: {
    marginBottom: 25,
  },
});

export default SplashScreen;
