import {Dimensions, NativeModules, PixelRatio, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import app from '~configs/app';

export const getDebugInfo = async () => {
  return {
    app: {
      name: await DeviceInfo.getApplicationName(),
      bundle_id: await DeviceInfo.getBundleId(),
      version: await DeviceInfo.getVersion(),
      installed: await DeviceInfo.getFirstInstallTime(),
      updated: await DeviceInfo.getLastUpdateTime(),
    },
    device: {
      deviceName: await DeviceInfo.getDeviceName(),
      brand: await DeviceInfo.getBrand(),
      manufacturer: await DeviceInfo.getManufacturer(),
      modelName: await DeviceInfo.getModel(),
      totalMemory: await DeviceInfo.getTotalMemory(),
      getUsedMemory: await DeviceInfo.getUsedMemory(),
      getFreeDiskStorage: await DeviceInfo.getFreeDiskStorage(),
      getUniqueId: await DeviceInfo.getUniqueId(),
      hasNotch: await DeviceInfo.hasNotch(),
      getDeviceType: await DeviceInfo.getDeviceType(),
      density: PixelRatio.get().toString(),
      height: Dimensions.get('window').height.toString(),
      width: Dimensions.get('window').width.toString(),
    },
    os: {
      osName: Platform.OS,
      osVersion: await DeviceInfo.getSystemVersion(),
      platformApiLevel: await DeviceInfo.getApiLevel(),
    },
    settings: {
      locale:
        Platform.OS === 'ios'
          ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0] //iOS 13
          : NativeModules.I18nManager.localeIdentifier,
      timezone_offset: new Date().getTimezoneOffset(),
    },
    configs: app,
  };
};
