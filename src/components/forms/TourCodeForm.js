import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '~elements/Button';
import Icon from '~elements/Icon';
import Input from '~elements/Input';
import TextError from '~elements/TextError';
import Api from '~libraries/Api';

const TourCodeForm = ({style, onSuccess, ...props}) => {
  const navigation = useNavigation();
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const verifyCode = async () => {
    this.codeInput.blur();
    setIsLoading(true);
    setErrorMessage('');
    const response = await Api('/auth/login_with_code', {code});
    setIsLoading(false);

    if (response === false) {
      Alert.alert('Network Error', 'Internet connection required');
      return;
    }

    if (!response.success) {
      return setErrorMessage(response.data.message);
    }

    return onSuccess(response.data, code);
  };

  return (
    <View style={[styles.wrapper, style]}>
      <Input
        label="Tour Access Code:"
        value={code}
        onChange={setCode}
        setRef={input => (this.codeInput = input)}
        invalid={errorMessage.length > 0}
        onSubmitEditing={verifyCode}
        afterInput={
          <Button
            style={{width: null, borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
            disabled={isLoading || code.length == 0}
            loading={isLoading}
            onPress={verifyCode}
          >
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

export default TourCodeForm;
