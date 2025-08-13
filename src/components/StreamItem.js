import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {Alert, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {themed} from '~configs/colors';
import Button from '~elements/Button';
import Tag from '~elements/Tag';
import Tags from '~elements/Tags';
import Text from '~elements/Text';
import {acfDateToHuman} from '~helpers/values';
import {getGlobalState} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';

const StreamItem = ({room, isFirst, style, ...props}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [roomOpened, setRoomOpened] = useState(room.agora_room_open);
  const currentUser = getGlobalState('currentUser');
  const guides = room.tour_guide || [];

  const toggleOpen = async () => {
    setLoading(true);
    const uri = roomOpened ? '/streams/close' : '/streams/open';
    const data = await Api(uri, {agora_room_id: room.agora_room_id});

    if (data === false) {
      Alert.alert('Network Error', 'Internet connection required');
      return;
    }

    setRoomOpened(data.data.opened);
    setLoading(false);
  };

  const gotoDetail = () => navigation.navigate(currentUser.user_type == 'user' ? 'RoomDetail' : 'SpeakDetail', {room});

  return (
    <View style={[styles.wrapper, isFirst ? {} : {borderTopWidth: 0.5, borderTopColor: themed.border}, style]} {...props}>
      <Tags>
        <Tag evaluator={true}>{`Day ${room.day_number}: ${acfDateToHuman(room.date)}`}</Tag>
      </Tags>
      <Text bold>{`${room.location}`}</Text>

      {guides.length > 0 ? (
        <View style={[styles.content]}>
          <View style={[styles.contentLeft]}>
            {guides.map((guide, i) => (
              <View key={i}>
                <Text>Guides: {guide.tour_guide_name}</Text>
                {currentUser.user_type == 'tour_manager' && <Text>Access Code: {guide.access_code.toUpperCase()}</Text>}
              </View>
            ))}
          </View>

          <View style={[styles.contentRight]}>
            {currentUser.user_type != 'tour_manager' && !room.agora_room_open && (
              <Button onPress={gotoDetail} style={styles.button} disabled={true}>
                Closed
              </Button>
            )}

            {(roomOpened || (currentUser.user_type != 'tour_manager' && room.agora_room_open)) && (
              <Button onPress={gotoDetail} style={styles.button}>
                Enter
              </Button>
            )}

            {currentUser.user_type == 'tour_manager' && (
              <Button onPress={toggleOpen} style={[styles.button, {marginLeft: 5}]} loading={loading}>
                {roomOpened ? 'Close' : 'Open'}
              </Button>
            )}
          </View>
        </View>
      ) : (
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
    paddingVertical: 10,
    borderBottomColor: themed.border,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentLeft: {
    flexDirection: 'row',
  },
  contentRight: {
    flexDirection: 'row',
  },
  button: {
    width: 'auto',
  },
});

export default StreamItem;
