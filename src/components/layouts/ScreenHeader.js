import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '~components/Header';
import ScreenBase from '~components/layouts/ScreenBase';
import ScreenFull from '~components/layouts/ScreenFull';

const ScreenHeader = ({noScroll, headerText, showBack, ...props}) => {
  const header = <Header headerText={headerText} showBack={showBack} />;

  if (noScroll) {
    const {children, ...rest} = props;

    return (
      <ScreenBase edges={['right', 'left']} {...rest}>
        {header}
        <View style={{flex: 1}}>{children}</View>
      </ScreenBase>
    );
  }

  return <ScreenFull edges={['right', 'left']} beforeView={header} {...props} />;
};

const styles = EStyleSheet.create({});

export default ScreenHeader;
