import {useEffect} from 'react';
import Analytics from 'appcenter-analytics';
import Crashes from 'appcenter-crashes';

const useAppCenterFeatures = () => {
  useEffect(() => {
    (async () => {
      if (__DEV__) {
        await Analytics.setEnabled(false);
        await Crashes.setEnabled(false);
      }
    })();
  }, []);
};

export default useAppCenterFeatures;
