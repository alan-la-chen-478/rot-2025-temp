import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import colors from '~configs/colors';
import Text from '~elements/Text';

const Tabs = ({children, ...props}) => {
  const [current, setCurrent] = useState(0);

  return (
    <View style={styles.wrapper} {...props}>
      <View style={styles.nav}>
        {children.map((child, index) => {
          const active = index == current;
          return (
            <Pressable style={[styles.navItem, active ? styles.navItemActive : null]} key={index} onPress={() => setCurrent(index)}>
              <Text textStyle={[styles.navItemText, active ? styles.navItemTextActive : null]}>{child.props.tabLabel}</Text>
            </Pressable>
          );
        })}
      </View>
      <View style={styles.tabContent}>{children[current]}</View>
    </View>
  );
};

const styles = EStyleSheet.create({
  wrapper: {},
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  navItem: {
    marginRight: 5,
  },
  navItemActive: {
    borderBottomWidth: 3,
    borderBottomColor: colors.primary,
  },
  navItemSeperator: {
    marginRight: 5,
  },
});

export default Tabs;
