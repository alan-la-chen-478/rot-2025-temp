export const isTruthy = value => {
  if (Array.isArray(value) && value.length == 0) {
    return false;
  }

  if (value instanceof Object && Object.keys(value).length == 0) {
    return false;
  }

  if (value === '0' || value === 'false') {
    return false;
  }

  return !!value;
};

export const maybeCall = (callback, args) => {
  if (!isTruthy(callback)) {
    return false;
  }

  return callback(...args);
};

export const objectGet = (obj, path = false, defaultValue = null) => {
  if (path === false) {
    return obj;
  }

  const result = arrayParse(path).reduce((prevObj, key) => {
    const regexp = /\{(.+)\}/g;
    const fixedKey = key.replace(regexp, '$1');
    return (
      prevObj &&
      (`${key}`.match(regexp) && isJson(prevObj[fixedKey]) ? JSON.parse(prevObj[fixedKey]) : prevObj[fixedKey])
    );
  }, obj);

  return result === undefined ? defaultValue : result;
};

export const objectSet = (obj, path, value) => {
  const pathArray = arrayParse(path);

  pathArray.reduce((acc, key, i) => {
    if (acc[key] === undefined) {
      acc[key] = {};
    }
    if (i === pathArray.length - 1) {
      acc[key] = value;
    }
    return acc[key];
  }, obj);
};

export const isJson = string => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }

  return true;
};

export const randomString = length => {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const arrayParse = source => {
  return Array.isArray(source) ? source : isTruthy(source) ? `${source}`.match(/([^[.\]])+/g) : [];
};

export const isEmail = email => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};

export const inArray = (key, array) => {
  return arrayParse(array).includes(key);
};

export const acfDateToHuman = string => {
  const year = string.substring(0, 4);
  const month = string.substring(4, 6);
  const date = string.substring(6, 8);

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return `${months[parseInt(month) - 1]} ${date}, ${year}`;
  // return new Date(`${year}-${month}-${date}`).toDateString();
};
