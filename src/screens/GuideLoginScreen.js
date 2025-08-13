import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import GuideCodeForm from '~components/forms/GuideCodeForm';
import Holder from '~components/Holder';
import AuthScreen from '~components/layouts/AuthScreen';
import Icon from '~elements/Icon';
import Link from '~elements/Link';
import TextSmall from '~elements/TextSmall';
import {useGlobalState} from '~hooks/useGlobalContext';
import {apiClient} from '~libraries/Api';

const GuideLoginScreen = ({navigation}) => {
  const [loggedIn, setLoggedIn] = useGlobalState('loggedIn');
  const [currentUser, setCurrentUser] = useGlobalState('currentUser');
  const [accessToken, setAccessToken] = useGlobalState('accessToken');

  const onSuccess = data => {
    setCurrentUser(data.user);
    setAccessToken(data.access_token);
    apiClient.setHeader('x-rot-auth-token', data.access_token);
    setLoggedIn(true);
  };

  return (
    <AuthScreen>
      <View style={styles.wrapper}>
        <TextSmall>Please ask the tour manager for the guide access code you need for speaking.</TextSmall>
        <GuideCodeForm style={styles.form} onSuccess={onSuccess} />
        <Holder>
          <Link onPress={() => navigation.goBack()} style={styles.link} textStyle={styles.linkText}>
            <Icon name="angle-left" /> Back
          </Link>
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
  link: {marginTop: 15},
  linkText: {fontSize: 14},
});

export default GuideLoginScreen;
