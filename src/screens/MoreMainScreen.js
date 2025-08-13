import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Alert, Linking, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import RNRestart from 'react-native-restart';
import ScreenHeader from '~components/layouts/ScreenHeader';
import NavigationItem from '~components/NavigationItem';
import VersionInfo from '~components/VersionInfo';
import colors from '~configs/colors';
import {objectGet} from '~helpers/values';
import {cacheKey} from '~hooks/useGlobalContext';
import {getFullGlobalState, useGlobalSetter} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';

const MoreMainScreen = ({navigation}) => {
  const globalState = getFullGlobalState();
  const setGlobalGlobal = useGlobalSetter('settings');

  const logout = async () => {
    Alert.alert('Are you sure?', "Logging out will clear out all the offline data, you'll need internet connection to log back in.", [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          await AsyncStorage.removeItem(cacheKey);
          RNRestart.Restart();
        },
      },
    ]);
  };

  const launchContact = async () => {
    let data = await Api('/settings/check');

    if (data === false) {
      data = objectGet(globalState, 'settings');
      if (!data) {
        Alert.alert('Network Error', 'Internet Connection Required');
        return;
      }
    } else {
      setGlobalGlobal(data);
    }

    const email = data.data.settings.app_static_pages__contact_email;
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ScreenHeader headerText="More" afterView={<VersionInfo />}>
      <View style={styles.upperWrapper}>
        {/*<NavigationItem screen="Settings" label="Settings" />*/}
        <NavigationItem screen="AboutUs" label="About Us" />
        <NavigationItem screen="TermsAndConditions" label="Terms & Conditions" />
        <NavigationItem screen="HelpsFAQ" label="Helps & FAQs" />
        <NavigationItem action={launchContact} label="Contact Us" />
        <NavigationItem action={logout} label="Logout" textStyle={{color: colors.red}} />
      </View>
    </ScreenHeader>
  );
};

const styles = EStyleSheet.create({
  upperWrapper: {
    padding: 15,
  },
});

export default MoreMainScreen;
