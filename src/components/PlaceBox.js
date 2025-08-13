import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '~configs/colors';
import {dropShadow} from '~configs/themes';
import BackgroundImage from '~elements/BackgroundImage';
import Text from '~elements/Text';

const PlaceBox = ({place, style, ...props}) => {
  const navigation = useNavigation();

  return (
    <Pressable style={[styles.wrapper, style]} {...props} onPress={() => navigation.navigate('PlaceDetail', {id: place.id})}>
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
