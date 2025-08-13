import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import StreamItem from '~components/StreamItem';
import colors from '~configs/colors';
import {dropShadow} from '~configs/styles';
import Text from '~elements/Text';

const StreamBox = ({stream, ...props}) => {
  return (
    <View style={styles.wrapper} {...props}>
      <View style={styles.body}>
        <Text textStyle={styles.titleText}>{stream.title}</Text>

        {stream.rooms.map((room, index) => (
          <StreamItem room={room} key={index} isFirst={index == 0} />
        ))}
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    margin: 15,
    ...dropShadow,
  },
  body: {
    backgroundColor: colors.white,
    padding: 10,
  },
  titleText: {
    fontSize: 22,
    color: colors.secondary,
  },
  descriptionText: {
    fontSize: 15,
  },
  actionHolder: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});

export default StreamBox;
