import React from 'react';
import {View, Pressable} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import DevPanelPressable from '~components/DevPanelPressable';
import Text from '~elements/Text';
import TextSmall from '~elements/TextSmall';
import Icon from '~elements/Icon';
import colors from '~configs/colors';

const Header = ({headerText, showBack, ...props}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const back = showBack ? (
    <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={15}>
      <Icon name="arrow-left" color={colors.white} />
    </Pressable>
  ) : null;

  return (
    <View style={[styles.wrapper, {paddingTop: insets.top + 10}]} {...props}>
      <View style={styles.wrapperLeft}>{back}</View>
      <View style={styles.wrapperRight}>
        <DevPanelPressable>
          <Text textStyle={styles.headerText} bold numberOfLines={1}>
            {headerText}
          </Text>
        </DevPanelPressable>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: colors.secondary,
  },
  wrapperLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  wrapperRight: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    flex: 1,
  },
  backButton: {
    marginRight: 25,
  },
  backButtonText: {
    color: colors.white,
    fontSize: 16,
  },
  headerText: {
    color: colors.white,
    fontSize: 24,
  },
});

export default Header;
