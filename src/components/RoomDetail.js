import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AgoraStream from '~components/AgoraStream';
import Divider from '~components/Divider';
import colors from '~configs/colors';
import Html from '~elements/Html';
import Text from '~elements/Text';

const RoomDetail = ({tokenInfo, room, ...props}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper} {...props}>
      <View style={styles.body}>
        <Text textStyle={styles.titleText} bold text={`Guides: ${room.tour_guide.map(guide => guide.tour_guide_name).join(', ')}`} />

        <Html evaluator={room.description} source={{html: room.description}} />

        <Divider style={{marginVertical: 25}} />

        <AgoraStream tokenInfo={tokenInfo} room={room} />
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {},
  body: {
    padding: 10,
    // backgroundColor: 'red',
  },
  titleText: {
    marginTop: -10,
    fontSize: 28,
    color: colors.secondary,
  },
  subTitleText: {
    marginTop: -15,
    fontSize: 22,
    color: colors.lightSecondary,
  },
  descriptionText: {
    fontSize: 15,
  },
});

export default RoomDetail;
