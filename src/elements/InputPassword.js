import React, {useState} from 'react';
import {Pressable} from 'react-native';
import Icon from '~elements/Icon';
import Button from '~elements/Button';
import Input from '~elements/Input';

const InputPassword = props => {
  const [secureText, setSecureText] = useState(true);

  return (
    <Input
      autoComplete="password"
      secureTextEntry={secureText}
      textContentType="password"
      afterInput={
        <Button
          style={{width: null, borderTopLeftRadius: 0, borderBottomLeftRadius: 0}}
          onPress={() => setSecureText(!secureText)}>
          <Icon name={secureText ? 'eye' : 'eye-slash'} size={18} />
        </Button>
      }
      controlStyle={{flexDirection: 'row', alignItems: 'center', marginTop: -5}}
      inputStyle={{flex: 1, borderTopRightRadius: 0, borderBottomRightRadius: 0}}
      {...props}
    />
  );
};

export default InputPassword;
