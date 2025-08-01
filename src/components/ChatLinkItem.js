import React from 'react';
import {View, Pressable, Linking, Alert} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useNavigation} from '@react-navigation/native';
import Text from '~elements/Text';
import Button from '~elements/Button';
import Icon from '~elements/Icon';
import {isTruthy, arrayParse} from '~helpers/values';

const ChatLinkItem = ({tour, style, ...props}) => {
  const chats = arrayParse(tour.group_chats);

  const onLinkPressed = async url => {
    try {
      await Linking.openURL(url);
    } catch (e) {
      Alert.alert('Error', 'Unable to open link');
    }
  };

  return (
    <View style={[styles.wrapper, style]} {...props}>
      {chats.map(chat => (
        <View style={[styles.content]} key={chat.platform}>
          <View style={[styles.contentLeft]}>
            <Text>{chat.platform}</Text>
          </View>
          <View style={[styles.contentRight]}>
            <Button onPress={async () => await onLinkPressed(chat.url)} style={{width: 'auto'}}>
              <Icon name="globe" color="white" />
            </Button>
          </View>
        </View>
      ))}

      {chats.length == 0 && (
        <View style={[styles.content]}>
          <Text>Not available</Text>
        </View>
      )}
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    marginBottom: 5,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentLeft: {
    flexDirection: 'row',
  },
});

export default ChatLinkItem;
