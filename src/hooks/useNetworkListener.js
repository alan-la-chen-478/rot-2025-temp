import NetInfo from '@react-native-community/netinfo';
import {useEffect} from 'react';
import {useGlobalState} from '~hooks/useGlobalContext';

const useNetworkListener = () => {
  const [hasConnection, setHasConnection] = useGlobalState('hasConnection');

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setHasConnection(state.isConnected);
    });

    return unsubscribe;
  }, []);
};

export default useNetworkListener;
