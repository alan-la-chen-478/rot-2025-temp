import NetInfo from '@react-native-community/netinfo';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {objectSet} from '~helpers/values';
import {getFullGlobalState, getGlobalState, setFullStateDraft} from '~hooks/useGlobalContext';
import Api from '~libraries/Api';

// const {loaded, loading, failed, data, refresh} = useFocusCache('pages.about', ['/pages/detail', {page: 'about'}]);

export const useFocusCache = (globalStateMapper, apiArgs, forceReload = false) => {
  const [init, setInit] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [data, setData] = useState(null);
  const source = getGlobalState(globalStateMapper);
  const fullState = getFullGlobalState();
  const setFullState = setFullStateDraft();

  useFocusEffect(
    useCallback(() => {
      if (init && !loading) {
        return;
      }

      setInit(true);
      setLoading(true);

      if (source && !loaded && !forceReload) {
        setLoaded(true);
        setLoading(false);
        setFailed(false);
        setData(source);
        return;
      }

      (async () => {
        const netInfo = await NetInfo.fetch();

        if (!netInfo.isConnected) {
          setLoaded(true);
          setLoading(true);
          setFailed(true);
          return;
        }

        const response = await Api(...apiArgs);
        setFullState(draft => {
          objectSet(draft, globalStateMapper, response.data);
        });

        setLoaded(true);
        setLoading(false);
        setFailed(false);
        setData(source);
      })();
    }, [init, loading]),
  );

  return {loaded, loading, failed, source, refresh: () => setLoading(true)};
};
