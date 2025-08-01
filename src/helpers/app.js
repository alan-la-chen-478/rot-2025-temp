import {maybeCall, objectGet} from '~helpers/values';
import app from '~configs/app';

export const urlReplace = string => {
  return string.replaceAll(getConfig('api.proxy_domain'), getConfig('api.domain')).replaceAll('http://', 'https://');
};

export const getConfig = (key, defaultValue) => {
  return objectGet(app, key, defaultValue);
};
