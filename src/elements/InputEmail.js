import React from 'react';
import Input from '~elements/Input';

const InputEmail = props => {
  return (
    <Input
      autoComplete="email"
      clearButtonMode="while-editing"
      keyboardType="email-address"
      textContentType="emailAddress"
      {...props}
    />
  );
};

export default InputEmail;
