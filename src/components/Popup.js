import React from 'react';
import {View, Modal, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Text from '~elements/Text';
import Icon from '~elements/Icon';
import colors from '~configs/colors';
import {dropShadow} from '~configs/styles';

const Popup = ({visible, onClose, style, children, ...props}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.wrapper}>
        <View style={styles.modalView}>
          {children}
          <Pressable style={styles.button} onPress={onClose}>
            <Icon name="times" />
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  modalView: {
    // backgroundColor: colors.white,
    borderRadius: 3,
    ...dropShadow,
    position: 'relative',
  },
  button: {
    position: 'absolute',
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    top: -12.5,
    right: -12.5,
  },
});

export default Popup;
