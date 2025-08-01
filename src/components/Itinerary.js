import React from 'react';
import {View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import AudioPlayer from '~components/AudioPlayer';
import Text from '~elements/Text';
import Tags from '~elements/Tags';
import Tag from '~elements/Tag';
import Html from '~elements/Html';
import colors from '~configs/colors';
import {dropShadow} from '~configs/styles';
import {acfDateToHuman, arrayParse} from '~helpers/values';
import {urlReplace} from '~helpers/app';

const Itinerary = ({style, itinerary, ...props}) => {
  return (
    <View style={[styles.wrapper, style]} {...props}>
      <Tags>
        <Tag
          evaluator={itinerary.day_number}
          background="transparent"
          textStyle={{
            color: colors.primary,
          }}>{`Day ${itinerary.day_number}`}</Tag>
        <Tag evaluator={itinerary.date}>{acfDateToHuman(itinerary.date)}</Tag>
      </Tags>

      <Text textStyle={styles.heading} bold text={itinerary.location} />
      <View style={styles.headingDecoration} />
      <Html source={{html: itinerary.description}} />

      {itinerary.audio.length > 0 && <AudioPlayer label="Tour Audio" mp3={urlReplace(itinerary.audio)} />}

      {arrayParse(itinerary.audios).map((audio, i) => {
        return (
          <View key={i}>
            <AudioPlayer mp3={urlReplace(audio.mp3)} label={audio.display_name} />
          </View>
        );
      })}
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    marginVertical: 10,
    borderRadius: 3,
    padding: 10,
    paddingRight: 20,
    backgroundColor: colors.white,
    ...dropShadow,
  },
  headingWrapper: {marginBottom: 15},
  heading: {
    fontSize: 24,
    color: colors.primary,
  },
  headingDecoration: {
    width: 50,
    height: 1,
    marginTop: 5,
    backgroundColor: colors.lightSecondary,
  },
});

export default Itinerary;
