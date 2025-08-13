import React from 'react';
import {Linking, Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Html from '~elements/Html';
import Text from '~elements/Text';

const UserInfo = ({style, user, ...props}) => {
  return (
    <View style={[styles.wrapper, style]} {...props}>
      {user.display_name?.length > 0 && (
        <View style={styles.inline}>
          <Text bold textStyle={styles.label}>
            Name:
          </Text>
          <Text>{user.display_name}</Text>
        </View>
      )}
      {user.user_email?.length > 0 && (
        <View style={styles.inline}>
          <Text bold textStyle={styles.label}>
            Email:
          </Text>
          <Pressable onPress={() => Linking.openURL(`mailto:${user.user_email}`)}>
            <Text>{user.user_email}</Text>
          </Pressable>
        </View>
      )}
      {user.user_phone?.length > 0 && (
        <View style={styles.inline}>
          <Text bold textStyle={styles.label}>
            Phone:
          </Text>
          <Pressable onPress={() => Linking.openURL(`tel:${user.user_phone}`)}>
            <Text>{user.user_phone}</Text>
          </Pressable>
        </View>
      )}
      <Html evaluation={user.user_description} source={{html: user.user_description}} />
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {},
  inline: {flexDirection: 'row', alignItems: 'center'},
  label: {marginRight: 10},
});

export default UserInfo;
