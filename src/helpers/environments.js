import DeviceInfo from 'react-native-device-info';

export const getBuild = () => {
  let bundle = DeviceInfo.getBundleId();

  if (bundle.indexOf('.releasestaging') > -1) {
    return 'stage';
  }

  if (bundle.indexOf('.development') > -1) {
    return 'development';
  }

  if (bundle.indexOf('.release') > -1) {
    return 'release';
  }

  return 'release';
};

export const isBuild = type => {
  return getBuild() == type;
};
