import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Screen from '~components/layouts/Screen';
import LogoWithText from '~components/LogoWithText';
import colors from '~configs/colors';

const AuthScreen = props => {
  return (
    <Screen wrapperStyle={styles.wrapper}>
      <LogoWithText style={styles.logo} />
      {props.children}
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

export default AuthScreen;
