import { isEmpty } from 'lodash';

const replaceKey = (array, key, newKey) => {
  if (isEmpty(array)) return array;
  return array?.map((e) => {
    const obj = {
      e,
    };
    obj[newKey] = e[key];
    obj[key] = undefined;
    return obj;
  });
};

export default replaceKey;