import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import ContactInfo from '~components/ContactInfo';
import Divider from '~components/Divider';
import InfoBox from '~components/InfoBox';
import UserInfo from '~components/UserInfo';
import {arrayParse} from '~helpers/values';

const TourTabContacts = ({tour, tourPlan, style, ...props}) => {
  const contacts = tourPlan.acf?.emergency_contacts || [];
  const tourManagers = arrayParse(tourPlan.acf.tour_manager);

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <InfoBox heading="Tour Manager" evaluator={tourManagers}>
        {tourManagers.map((manager, i) => (
          <UserInfo key={i} user={manager} style={{marginBottom: i < tourManagers.length ? 10 : 0}} />
        ))}
      </InfoBox>

      <InfoBox heading="Emergency Contacts" evaluator={contacts}>
        {contacts.map((contact, index) => (
          <React.Fragment key={index}>
            <ContactInfo contact={contact} />
            {index < tourPlan.acf.emergency_contacts.length - 1 && <Divider style={{marginVertical: 25}} />}
          </React.Fragment>
        ))}
      </InfoBox>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {},
});

export default TourTabContacts;
