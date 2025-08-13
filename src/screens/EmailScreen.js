import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Divider from '~components/Divider';
import VerifyEmailForm from '~components/forms/VerifyEmailForm';
import Holder from '~components/Holder';
import AuthScreen from '~components/layouts/AuthScreen';
import colors from '~configs/colors';
import Button from '~elements/Button';
import Link from '~elements/Link';

const EmailScreen = ({navigation}) => {
  const onSuccess = (email, data) => {
    if (data.has_account) {
      return navigation.navigate('Login', {email});
    }

    return navigation.navigate('Register', {email});
  };

  return (
    <AuthScreen>
      <View style={styles.wrapper}>
        {/*<TextSmall>Some text here like "enter your email address that's registered with your tour."</TextSmall>*/}
        <VerifyEmailForm style={styles.form} onSuccess={onSuccess} />
        <Divider style={styles.devider} color={colors.secondary} text="or" />
        <Holder>
          <Button onPress={() => navigation.navigate('CodeLogin')}>Login with tour code</Button>
          <Button onPress={() => navigation.navigate('GuideLogin')}>Login as guest guide</Button>
        </Holder>
        <Holder style={{marginTop: 20}}>
          <Link onPress={() => navigation.navigate('LoginHelp')}>How to become a customer?</Link>
        </Holder>
      </View>
    </AuthScreen>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    width: '80%',
  },
  form: {
    marginTop: 25,
  },
  devider: {marginVertical: 15},
});

export default EmailScreen;
