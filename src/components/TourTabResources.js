import React, {useState} from 'react';
import {View, Pressable, Modal} from 'react-native';
import * as FileSystem from 'expo-file-system';
import {WebView} from 'react-native-webview';
import {SafeAreaView} from 'react-native-safe-area-context';
import EStyleSheet from 'react-native-extended-stylesheet';
import InfoBox from '~components/InfoBox';
import InfoLine from '~components/InfoLine';
import ImageGallery from '~components/ImageGallery';
import Image from '~elements/Image';
import Text from '~elements/Text';
import Html from '~elements/Html';
import Icon from '~elements/Icon';
import colors from '~configs/colors';
import {dropShadow} from '~configs/themes';
import {urlReplace} from '~helpers/app';

const TourTabResources = ({tour, tourPlan, style, ...props}) => {
  const [pdfVisible, setPdfVisible] = useState(false);
  const [pdfSource, setPdfSource] = useState('');

  const viewResource = async url => {
    const remoteUrl = urlReplace(url);
    setPdfVisible(true);
    setPdfSource(remoteUrl);
  };

  return (
    <View style={[styles.wrapper, style]} {...props}>
      <InfoBox
        heading="Tour Map"
        evaluator={tour.acf?.tour_map_image_app?.sizes?.medium_large}>
        <Image
          source={{uri: tour.acf?.tour_map_image_app?.sizes?.medium_large}}
        />
      </InfoBox>

      <InfoBox heading="Tour Gallery" evaluator={tour.acf?.tour_gallery}>
        <ImageGallery images={tour.acf?.tour_gallery} />
      </InfoBox>

      <InfoBox heading="Tour Brochure" evaluator={tourPlan.acf?.tour_brochure}>
        <Pressable onPress={() => viewResource(tourPlan.acf.tour_brochure.url)}>
          <Image
            source={{
              uri: tourPlan.acf?.tour_brochure_image?.sizes?.medium_large,
            }}
          />
        </Pressable>
      </InfoBox>

      <InfoLine
        heading="Pre-tour Checklist"
        evaluator={tour.acf['pre-tour_checklist']}
        content={innerStyle => {
          return (
            <Pressable
              onPress={() => viewResource(tour.acf['pre-tour_checklist'].url)}>
              <Text textStyle={[innerStyle, {alignItems: 'center'}]}>
                {tour.acf['pre-tour_checklist'].filename}
              </Text>
            </Pressable>
          );
        }}
      />

      <InfoLine
        heading="Pre-tour Packing List"
        evaluator={tour.acf['pre-tour_checklist_copy']}
        content={innerStyle => {
          return (
            <Pressable
              onPress={() =>
                viewResource(tour.acf['pre-tour_checklist_copy'].url)
              }>
              <Text textStyle={[innerStyle, {alignItems: 'center'}]}>
                {tour.acf['pre-tour_checklist_copy'].filename}
              </Text>
            </Pressable>
          );
        }}
      />

      <Modal
        animationType="slide"
        visible={pdfVisible}
        onRequestClose={() => setPdfVisible(false)}>
        <SafeAreaView style={styles.centeredView}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setPdfVisible(false)}>
              <Text>
                <Icon name="times" /> Close
              </Text>
            </Pressable>
          </View>
          <View style={styles.modalView}>
            <WebView source={{uri: pdfSource}} style={{flex: 1}} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {},
  centeredView: {flex: 1},
  modalHeader: {
    backgroundColor: colors.white,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    ...dropShadow,
  },
  modalView: {flex: 1},
});

export default TourTabResources;
