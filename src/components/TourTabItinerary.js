import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import Itinerary from '~components/Itinerary';

const TourTabItinerary = ({tour, tourPlan, style, ...props}) => {
  // console.log(JSON.stringify(tour.acf));
  const itineraries = tourPlan.acf.daily_Itinerary || [];
  return itineraries.map((itinerary, index) => <Itinerary key={index} itinerary={itinerary} />);
};

const styles = EStyleSheet.create({
  wrapper: {},
});

export default TourTabItinerary;
