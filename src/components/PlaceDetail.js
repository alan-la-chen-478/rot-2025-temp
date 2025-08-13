import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ImageGallery from '~components/ImageGallery';
import InfoBox from '~components/InfoBox';
import colors from '~configs/colors';
import Html from '~elements/Html';
import Image from '~elements/Image';
import Text from '~elements/Text';

const PlaceDetail = ({place, ...props}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper} {...props}>
      <Image source={{uri: place.featured_image}} />
      <View style={styles.body}>
        <Text textStyle={styles.titleText} bold text={place.title} />
        <Html evaluation={place.content} source={{html: place.content}} />

        <InfoBox heading="Place Gallery" evaluator={place.acf.destination_gallery} style={{marginTop: 25}}>
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
