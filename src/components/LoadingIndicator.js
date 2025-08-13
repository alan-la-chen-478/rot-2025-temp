import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Holder from '~components/Holder';
import Loading from '~elements/Loading';

const LoadingIndicator = ({style, loadingProps, ...props}) => {
  return (
    <Holder style={[styles.wrapper, style]} {...props}>
      <Loading {...loadingProps} />
    </Holder>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    padding: 20,
  },
});

export default LoadingIndicator;
