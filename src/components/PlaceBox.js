import React from 'react';
import {View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Holder from '~components/Holder';
import Button from '~elements/Button';
import BackgroundImage from '~elements/BackgroundImage';
import Text from '~elements/Text';
import colors from '~configs/colors';
import {dropShadow} from '~configs/themes';

const PlaceBox = ({place, style, ...props}) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.wrapper, style]}
      {...props}
      onPress={() => navigation.navigate('PlaceDetail', {id: place.id})}>
      <BackgroundImage source={{uri: place.featured_image}} style={{height: 150}} />
      <View style={styles.body}>
        <Text textStyle={styles.titleText}>{place.title}</Text>
      </View>
    </Pressable>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    margin: 5,
    ...dropShadow,
  },
  body: {
    backgroundColor: colors.white,
    padding: 10,
  },
  titleText: {
    fontSize: 18,
    color: colors.secondary,
  },
});

export default PlaceBox;
