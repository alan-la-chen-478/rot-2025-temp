import notifee from '@notifee/react-native';

let channel = null;
let notification = null;

const start = async name => {
  // console.log('start');
  const permissions = await notifee.requestPermission({
    provisional: true,
  });

  if (!permissions.authorizationStatus) {
    console.log('no permission');
    return;
  }

  if (!channel) {
    channel = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
  }

  notification = await notifee.displayNotification({
    title: 'Royale Orchid Tours',
    body: `Audio streaming in progress... (${name})`,
    android: {
      channelId: channel,
      asForegroundService: true,
      autoCancel: false,
      // progress: {
      //   indeterminate: true,
      // },
      pressAction: {
        id: 'default',
      },
      // showChronometer: true,
    },
  });
};

const stop = async () => {
  // console.log('stop');
  await notifee.stopForegroundService();
  notification = null;
};

const Notifee = {
  start,
  stop,
};

export default Notifee;
