import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
// import Carousel from 'react-native-snap-carousel';
import Popup from '~components/Popup';
import Image from '~elements/Image';
import Loading from '~elements/Loading';
import Text from '~elements/Text';

const ImageGallery = ({style, images, ...props}) => {
  const [wrapperWidth, setWrapperWidth] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalImage, setModalImage] = useState('');

  const onWrapperLayout = event => setWrapperWidth(event.nativeEvent.layout.width);
  const showModal = item => {
    setModalImage(item.sizes?.medium_large);
    setModalVisible(true);
  };

  const renderItem = ({item, index}) => {
    return (
      <Pressable onPress={() => showModal(item)}>
        <Image source={{uri: item.sizes.thumbnail}} />
      </Pressable>
    );
  };

  return (
    <View style={[styles.wrapper, style]} {...props} onLayout={onWrapperLayout}>
      {wrapperWidth ? (
        <Text>Carousel Here</Text>
      ) : (
        // <Carousel
        //   data={images}
        //   renderItem={renderItem}
        //   sliderWidth={wrapperWidth}
        //   itemWidth={150}
        //   activeSlideAlignment="start"
        // />
        <Loading />
      )}

      <Popup visible={modalVisible} onClose={() => setModalVisible(false)}>
        {modalVisible ? <Image source={{uri: modalImage}} /> : null}
      </Popup>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {},
});

export default ImageGallery;
