import React, {useState, useRef} from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';
import Api from '~libraries/Api';
import Holder from '~components/Holder';
import Button from '~elements/Button';
import InputEmail from '~elements/InputEmail';
import InputPassword from '~elements/InputPassword';
import Icon from '~elements/Icon';
import TextError from '~elements/TextError';

const PasswordForm = ({style, onSuccess, onSubmit, email, passwordLabelText, submitText, ...props}) => {
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyPassword = async () => {
    this.passwordInput.blur();
    setIsLoading(true);
    setErrorMessage('');
    const response = await onSubmit({email, password});
    setIsLoading(false);

    if (!response.success) {
      return setErrorMessage(response.data.message);
    }

    return onSuccess(response.data);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <InputEmail label="Email Address:" value={email} disabled={true} />
      <InputPassword
        label={passwordLabelText}
        value={password}
        onChange={setPassword}
        setRef={input => (this.passwordInput = input)}
        invalid={errorMessage.length > 0}
        onSubmitEditing={verifyPassword}
        afterControl={errorMessage.length > 0 && <TextError>{errorMessage}</TextError>}
      />
      <Holder style={{marginTop: 20}}>
        <Button onPress={verifyPassword} disabled={isLoading || password.length == 0} loading={isLoading}>
          {submitText}
        </Button>
      </Holder>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {},
});

export default PasswordForm;
