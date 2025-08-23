import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const variant = process.env.APP_VARIANT || process.env.EAS_BUILD_PROFILE || 'debug';
const envFile = path.resolve(__dirname, `.env.${variant}`);
dotenv.config({path: envFile});

export default {
  expo: {
    owner: 'alro-media',
    name: process.env.APP_NAME,
    displayName: process.env.DISPLAY_NAME,
    slug: 'royale-orchid-tours-2025',
    version: process.env.APP_VERSION,
    orientation: 'portrait',
    icon: `./assets/app/${variant}/icon.png`,
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: process.env.APP_ID,
      buildNumber: process.env.BUILD_VERSION,
      infoPlist: {
        NSCameraUsageDescription: '$(PRODUCT_NAME) needs access to your camera so you can record and broadcast video to others.',
        ITSAppUsesNonExemptEncryption: false,
        UIBackgroundModes: ['fetch', 'remote-notification', 'audio'],
      },
    },
    android: {
      softwareKeyboardLayoutMode: 'pan',
      package: process.env.APP_ID,
      versionCode: process.env.BUILD_VERSION,
      edgeToEdgeEnabled: true,
      permissions: ['android.permission.CAMERA', 'android.permission.RECORD_AUDIO'],
      blockedPermissions: ['FOREGROUND_SERVICE_MEDIA_PLAYBACK', 'FOREGROUND_SERVICE_LOCATION'],
    },
    extra: {
      eas: {
        projectId: 'c916fa7a-668a-4b1b-b5a4-29b2c2651655',
      },
      APP_VARIANT: variant,
      APP_NAME: process.env.APP_NAME,
      DISPLAY_NAME: process.env.DISPLAY_NAME,
      APP_ID: process.env.APP_ID,
      APP_VERSION: process.env.APP_VERSION,
      BUILD_VERSION: process.env.BUILD_VERSION,
      APP_PATCH: process.env.APP_PATCH,
    },
    runtimeVersion: process.env.APP_VERSION,
    updates: {
      url: 'https://u.expo.dev/c916fa7a-668a-4b1b-b5a4-29b2c2651655',
      runtimeVersion: process.env.APP_VERSION,
      checkAutomatically: 'ON_ERROR_RECOVERY',
    },
    plugins: [
      [
        'expo-asset',
        {
          assets: ['assets/images'],
        },
      ],
      [
        'expo-font',
        {
          fonts: ['./assets/fonts/PragatiNarrow-Regular.ttf', './assets/fonts/PragatiNarrow-Bold.ttf'],
        },
      ],
      [
        'expo-audio',
        {
          microphonePermission: '$(PRODUCT_NAME) needs access to your microphone so you can record and broadcast your voice to others.',
        },
      ],
      [
        'expo-video',
        {
          supportsBackgroundPlayback: true,
        },
      ],
      [
        'expo-splash-screen',
        {
          backgroundColor: '#c4b0ec',
          resizeMode: 'contain',
          image: `./assets/app/${variant}/splash.png`,
          imageWidth: 200,
        },
      ],
      'expo-audio',
      'expo-video',
    ],
  },
};
