import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Holder from '~components/Holder';
import colors from '~configs/colors';
import {dropShadow} from '~configs/styles';
import BackgroundImage from '~elements/BackgroundImage';
import Button from '~elements/Button';
import Text from '~elements/Text';
import {acfDateToHuman} from '~helpers/values';

const TourBox = ({tour, ...props}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper} {...props}>
      <BackgroundImage source={{uri: tour.featured_image}} style={{height: 200}} />
      <View style={styles.body}>
        <Text textStyle={styles.titleText}>{tour.title}</Text>
        <Text textStyle={styles.descriptionText} evaluation={tour.short_description}>
          {tour.short_description}
        </Text>
        <Text textStyle={styles.dateText} evaluation={tour.tour_start_date}>
          {acfDateToHuman(tour.tour_start_date)} - {acfDateToHuman(tour.tour_end_date)}
        </Text>
        <Holder style={styles.actionHolder}>
          <Button onPress={() => navigation.navigate('TourDetail', {id: tour.id})}>View Details</Button>
        </Holder>
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
  dateText: {
    fontSize: 14,
    marginTop: -15,
  },
  actionHolder: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
});

export default TourBox;
