import * as React from 'react';
import {ImageBackground, Linking, Pressable} from 'react-native';
import ContextMenu from 'react-native-context-menu-view';
import type {favsType} from './Top';

type avatarProps = {
  user: favsType;
  onPress: () => void;
  deleteItem: () => void;
  onGift: () => void;
};
const standartActions = [
  {
    title: 'Visit boosty page',
    systemIcon: 'bookmark',
  },
  {
    title: 'Delete',
    systemIcon: 'trash',
    destructive: true,
  },
  {
    title: 'Buy gift subs',
    systemIcon: 'gift',
  },
];

export default ({user, onPress, deleteItem, onGift}: avatarProps) => {
  const actions = [];
  actions.push(standartActions[0]);
  if (user.twitch) {
    actions.push({
      title: 'Visit Twitch',
      systemIcon: 'play',
    });
  }
  actions.push(standartActions[2]);
  actions.push(standartActions[1]);

  return (
    <Pressable onPress={onPress}>
      <ContextMenu
        title={user.id}
        actions={actions}
        onPress={event => {
          const {name} = event.nativeEvent;

          if (name === 'Visit boosts page') {
            onPress();
          } else if (name === 'Delete') {
            deleteItem();
          } else if (name === 'Visit Twitch') {
            Linking.canOpenURL(user.twitch).then(supported => {
              if (supported) {
                Linking.openURL(user.twitch);
              } else {
                console.log(`Don't know how to open URI: ${user.twitch}`);
              }
            });
          } else if (name === 'Buy gift subs') {
            onGift();
          }

          event.preventDefault();
        }}
        onCancel={() => {
          console.warn('CANCELLED');
        }}
        previewBackgroundColor="transparent">
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
      </ContextMenu>
    </Pressable>
  );
};
