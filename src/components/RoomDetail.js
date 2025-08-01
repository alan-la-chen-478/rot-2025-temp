import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Holder from '~components/Holder';
import TourTabInformation from '~components/TourTabInformation';
import TourTabItinerary from '~components/TourTabItinerary';
import TourTabContacts from '~components/TourTabContacts';
import TourTabResources from '~components/TourTabResources';
import AgoraStream from '~components/AgoraStream';
import Html from '~elements/Html';
import Button from '~elements/Button';
import Image from '~elements/Image';
import Text from '~elements/Text';
import Tags from '~elements/Tags';
import Tag from '~elements/Tag';
import Tabs from '~elements/Tabs';
import Divider from '~components/Divider';
import colors from '~configs/colors';
import {dropShadow} from '~configs/styles';

const RoomDetail = ({tokenInfo, room, ...props}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper} {...props}>
      <View style={styles.body}>
        <Text
          textStyle={styles.titleText}
          bold
          text={`Guides: ${room.tour_guide
            .map(guide => guide.tour_guide_name)
            .join(', ')}`}
        />

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
