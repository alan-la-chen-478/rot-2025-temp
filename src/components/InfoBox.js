import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '~configs/colors';
import {dropShadow} from '~configs/styles';
import Text from '~elements/Text';

const InfoBox = ({style, heading, children, evaluator, ...props}) => {
  if (evaluator == false || evaluator === undefined || (evaluator && evaluator.length == 0)) {
    return null;
  }

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <View style={styles.headingWrapper}>
        <Text textStyle={styles.heading} text={heading} />
        <View style={styles.headingDecoration} />
      </View>
      {children}
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 10,
    borderRadius: 3,
    padding: 10,
    paddingRight: 20,
    backgroundColor: colors.white,
    ...dropShadow,
  },
  headingWrapper: {marginBottom: 15},
  heading: {
    fontSize: 20,
    color: colors.primary,
  },
  headingDecoration: {
    width: 50,
    height: 1,
    marginTop: 5,
    backgroundColor: colors.lightSecondary,
  },
});

export default InfoBox;
