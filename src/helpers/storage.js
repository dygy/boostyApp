import AsyncStorage from '@react-native-async-storage/async-storage';

const APP_PREFIX = '@boosty';

export const getData = async key => {
  try {
    const jsonValue = await AsyncStorage.getItem(APP_PREFIX + key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // read error
  }
};

export const setData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(APP_PREFIX + key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const removeData = async key => {
  try {
    return await AsyncStorage.removeItem(APP_PREFIX + key);
  } catch (e) {
    // remove error
  }
};

export const setFavs = async value => {
  await setData('favs', [value, ...(await getFavs())]);
};

export const deleteFavs = async value => {
  const favs = await getFavs();
  await setData(
    'favs',
    favs.filter(item => item.id !== value.id),
  );
};

export const getFavs = async () => {
  const favs = await getData('favs');
  if (!favs) {
    await setData('favs', []);
    return [];
  }
  return favs;
};
