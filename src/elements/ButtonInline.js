import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '~elements/Button';

const ButtonInline = props => {
  return <Button style={styles.wrapper} {...props} />;
};

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    width: null,
  },
});

export default ButtonInline;
