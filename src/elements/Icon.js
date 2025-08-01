import React from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

const Icon = ({name, ...props}) => {
  const [iconName, iconStyle = 'solid'] = name.split('@');
  console.log(iconName, iconStyle);
  return <FontAwesome5 iconStyle={iconStyle} name={iconName} {...props} />;
};

export default Icon;
