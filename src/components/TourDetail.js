import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Divider from '~components/Divider';
import TourTabContacts from '~components/TourTabContacts';
import TourTabInformation from '~components/TourTabInformation';
import TourTabItinerary from '~components/TourTabItinerary';
import TourTabResources from '~components/TourTabResources';
import colors from '~configs/colors';
import Html from '~elements/Html';
import Image from '~elements/Image';
import Tabs from '~elements/Tabs';
import Tag from '~elements/Tag';
import Tags from '~elements/Tags';
import Text from '~elements/Text';

const TourDetail = ({tour, tourPlan, ...props}) => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper} {...props}>
      <Image source={{uri: tour.featured_image}} />
      <View style={styles.body}>
        <Tags>
          <Tag evaluator={tour.acf.number_of_days}>{tourPlan.acf.number_of_days} days</Tag>
          <Tag evaluator={tour.acf.tour_type}>{tour.acf.tour_type}</Tag>
        </Tags>

        <Text textStyle={styles.titleText} bold text={tourPlan.title} />
        <Text textStyle={styles.subTitleText} text={tourPlan.sub_title} />

        <Html textStyle={styles.descriptionText} evaluation={tour.acf['short_description:']} source={{html: tour.acf['short_description:']}}></Html>

        <Html textStyle={styles.descriptionText} evaluation={tourPlan.acf.additional_description} source={{html: tourPlan.acf.additional_description}}></Html>

        <Divider style={{marginVertical: 25}} />

        <Tabs>
          <TourTabInformation tabLabel="Infomation" tabKey="info" tour={tour} tourPlan={tourPlan} />
          <TourTabItinerary tabLabel="Itinerary" tabKey="itinerary" tour={tour} tourPlan={tourPlan} />
          <TourTabResources tabLabel="Resources" tabKey="resources" tour={tour} tourPlan={tourPlan} />
          <TourTabContacts tabLabel="Contacts" tabKey="contacts" tour={tour} tourPlan={tourPlan} />
        </Tabs>
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

export default TourDetail;
