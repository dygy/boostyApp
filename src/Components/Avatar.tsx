import * as React from 'react';
import {ImageBackground, Linking} from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type {favsType} from './Top';
import CustomContextMenu from './CustomContextMenu';
import photo from '../assets/icon.png';
import twitch from '../assets/twitch.png';
import gift from '../assets/gift.png';
import trash from '../assets/trash.png';

type avatarProps = {
  user: favsType;
  onPress: () => void;
  deleteItem: () => void;
  onGift: () => void;
  setModalLayout: () => void;
};

export default ({
  user,
  onPress,
  deleteItem,
  onGift,
  setModalLayout,
}: avatarProps) => {
  const standardActions = [
    {
      title: 'Visit boosty page',
      icon: (
        <ImageBackground imageStyle={{height: 32, width: 32}} source={photo} />
      ),
      func: onPress,
    },
    {
      title: 'Delete',
      icon: (
        <ImageBackground imageStyle={{height: 32, width: 32}} source={trash} />
      ),
      func: deleteItem,
    },
    {
      title: 'Buy gift subs',
      icon: (
        <ImageBackground imageStyle={{height: 32, width: 32}} source={gift} />
      ),
      func: onGift,
    },
  ];

  const actions = [];
  actions.push(standardActions[0]);
  if (user.twitch) {
    actions.push({
      title: 'Visit Twitch',
      icon: (
        <ImageBackground imageStyle={{height: 32, width: 32}} source={twitch} />
      ),
      func: () =>
        Linking.canOpenURL(user.twitch).then(supported => {
          if (supported) {
            Linking.openURL(user.twitch);
          } else {
            console.log(`Don't know how to open URI: ${user.twitch}`);
          }
        }),
    });
  }
  actions.push(standardActions[2]);
  actions.push(standardActions[1]);

  return (
    <CustomContextMenu
      onPress={onPress}
      title={user.id}
      actions={actions}
      setModalLayout={setModalLayout}>
      <ImageBackground
        imageStyle={{
          borderRadius: 32,
        }}
        style={{
          height: 32,
          width: 32,
          marginRight: 6,
        }}
        source={{uri: user.avatar}}
      />
    </CustomContextMenu>
  );
};
