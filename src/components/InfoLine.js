import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Text from '~elements/Text';
import colors from '~configs/colors';
import {dropShadow} from '~configs/styles';

const InfoLine = ({style, value, heading, content, evaluator, ...props}) => {
  if (evaluator == false || evaluator === undefined || (evaluator && evaluator.length == 0)) {
    return null;
  }

  if (value && value.length == 0) {
    return null;
  }

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <View style={styles.wrapperLeft}>
        <Text textStyle={styles.heading} text={heading} />
      </View>
      <View style={styles.wrapperRight}>
        {content ? content(styles.value) : <Text textStyle={styles.value}>{value}</Text>}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 5,
    borderRadius: 3,
    padding: 10,
    paddingRight: 20,
    backgroundColor: colors.white,
    ...dropShadow,
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperLeft: {
    width: '40%',
  },
  wrapperRight: {
    flex: 1,
  },
  headingWrapper: {
    textAlign: 'right',
  },
  heading: {
    fontSize: 18,
    color: colors.primary,
  },
  value: {
    textAlign: 'right',
  },
});

export default InfoLine;
