import React, {useState, useRef} from 'react';
import {View, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';
import Api from '~libraries/Api';
import Holder from '~components/Holder';
import Button from '~elements/Button';
import InputEmail from '~elements/InputEmail';
import InputPassword from '~elements/InputPassword';
import Icon from '~elements/Icon';
import TextError from '~elements/TextError';

const VerifyEmailForm = ({style, onSuccess, ...props}) => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyEmail = async () => {
    this.emailInput.blur();
    setIsLoading(true);
    setErrorMessage('');
    const response = await Api('/auth/lookup', {email});
    setIsLoading(false);

    if (response === false) {
      Alert.alert('Network Error', 'Internet connection required');
      return;
    }

    if (!response.success) {
      return setErrorMessage(response.data.message);
    }

    return onSuccess(email, response.data);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <InputEmail
        label="Email Address:"
        value={email}
        onChange={setEmail}
        setRef={input => (this.emailInput = input)}
        invalid={errorMessage.length > 0}
        onSubmitEditing={verifyEmail}
        afterInput={
          <Button
            style={{width: null, borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
            disabled={isLoading || email.length == 0}
            loading={isLoading}
            onPress={verifyEmail}>
            <Icon name="arrow-circle-o-right" size={18} />
          </Button>
        }
        afterControl={errorMessage.length > 0 && <TextError>{errorMessage}</TextError>}
        controlStyle={{flexDirection: 'row', alignItems: 'center', marginTop: -5}}
        inputStyle={{flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0}}
      />
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {},
});

export default VerifyEmailForm;
