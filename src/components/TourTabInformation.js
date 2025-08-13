import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import InfoBox from '~components/InfoBox';
import InfoLine from '~components/InfoLine';
import colors from '~configs/colors';
import Bullet from '~elements/Bullet';
import Html from '~elements/Html';
import {acfDateToHuman} from '~helpers/values';

const TourTabInformation = ({tour, tourPlan, style, ...props}) => {
  const highlights = tourPlan.acf.overwrite_tours_highlights ? tourPlan.acf.tours_highlights : tour.acf.long_description;
  const includes = tourPlan.acf.overwrite_tours_included ? tourPlan.acf.included : tour.acf.included;
  const notIncludes = tourPlan.acf.overwrite_tours_not_included ? tourPlan.acf.not_included : tour.acf.not_included;

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <InfoBox heading="Tour Highlights" evaluator={highlights}>
        <Html source={{html: highlights}} />
      </InfoBox>

      <InfoLine heading="Number of Days" value={tourPlan.acf.number_of_days} evaluator={tourPlan.acf.number_of_days} />
      <InfoLine heading="Start Date" value={acfDateToHuman(tourPlan.acf.start_date)} evaluator={tourPlan.acf.start_date} />
      <InfoLine heading="End Date" value={acfDateToHuman(tourPlan.acf.end_date)} evaluator={tourPlan.acf.end_date} />

      <InfoBox heading="Included" evaluator={includes}>
        {includes.map((included, index) => (
          <Bullet key={index} iconStyle={{color: colors.success}}>
            {included.description}
          </Bullet>
        ))}
      </InfoBox>

      <InfoBox heading="Not Included" evaluator={notIncludes}>
        {notIncludes.map((notIncluded, index) => (
          <Bullet key={index} icon="times-circle" iconStyle={{color: colors.error}}>
            {notIncluded.description}
          </Bullet>
        ))}
      </InfoBox>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {},
});

export default TourTabInformation;
