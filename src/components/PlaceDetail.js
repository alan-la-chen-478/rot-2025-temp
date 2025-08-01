import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Holder from '~components/Holder';
import InfoBox from '~components/InfoBox';
import ImageGallery from '~components/ImageGallery';
import Button from '~elements/Button';
import Image from '~elements/Image';
import Html from '~elements/Html';
import Text from '~elements/Text';
import Tags from '~elements/Tags';
import Tag from '~elements/Tag';
import Tabs from '~elements/Tabs';
import Divider from '~components/Divider';
import colors from '~configs/colors';
import {dropShadow} from '~configs/styles';

const PlaceDetail = ({place, ...props}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper} {...props}>
      <Image source={{uri: place.featured_image}} />
      <View style={styles.body}>
        <Text textStyle={styles.titleText} bold text={place.title} />
        <Html evaluation={place.content} source={{html: place.content}} />

        <InfoBox
          heading="Place Gallery"
          evaluator={place.acf.destination_gallery}
          style={{marginTop: 25}}>
          <ImageGallery images={place.acf.destination_gallery} />
        </InfoBox>
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

export default PlaceDetail;
