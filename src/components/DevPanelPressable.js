import {useNavigation} from '@react-navigation/native';
import React from 'react';
import MultiPressable from '~elements/MultiPressable';

const DevPanelPressable = ({children, ...props}) => {
  const navigation = useNavigation();

  return (
    <MultiPressable multiPressTimes={10} onMultiPress={() => navigation.navigate('Developer')} {...props}>
      {children}
    </MultiPressable>
  );
};

export default DevPanelPressable;
