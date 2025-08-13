import React from 'react';
import {KeyboardAvoidingView, Platform} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {SafeAreaView} from 'react-native-safe-area-context';

const ScreenBase = ({edges, ...props}) => {
  return (
    <SafeAreaView style={[styles.wrapper, props.wrapperStyle]} edges={edges ? edges : ['right', 'top', 'bottom', 'left']}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {props.children}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = EStyleSheet.create({
  wrapper: {flex: 1},
  keyboardView: {flex: 1},
});

export default ScreenBase;
