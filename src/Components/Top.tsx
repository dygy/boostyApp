import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Alert, Button, ScrollView, TextInput, View} from 'react-native';
import Avatar from './Avatar';
import {deleteFavs, getFavs, setFavs} from '../helpers/storage';
import BoostyButton from './BoostyButton';

type topProps = {
  WINDOW_HEIGHT: number;
  isAdding: boolean;
  nav: string;
  setIsAdding: (isAdding: boolean) => void;
  setNav: (nav: string) => void;
  boosty: string;
};

export type favsType = {
  id: string;
  avatar: string;
  twitch: string;
};

const Top = ({
  WINDOW_HEIGHT,
  isAdding,
  nav,
  setIsAdding,
  setNav,
  boosty,
}: topProps) => {
  const [favs, setFav] = useState([]);
  const [text, setText] = useState('');
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    getFavs().then(setFav);
  }, []);

  const avatarRegex = /<img.*?src="(.*?)".*?>/gm;
  const twitchRegex = /<a.*href="(.*?twitch.tv.*?)"/gm;
  const handleClick = async () => {
    const id = nav.replace(boosty, '');
    const isUsed = favs.find((item: favsType) => item.id === id);

    if (isUsed) {
      return Alert.alert('Unable to add', `You already added ${id}`, [
        {
          text: 'OK',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    }

    let avatar = null;
    let twitch = null;

    setIsAdding(true);

    await fetch(nav)
      .then(response => {
        // The API call was successful!
        return response.text();
      })
      .then(async data => {
        let matchRE: RegExpExecArray | null = null;

        while ((matchRE = avatarRegex.exec(data)) !== null) {
          matchRE.forEach((match, groupIndex) => {
            if (groupIndex === 1 && matchRE !== null) {
              if (
                (matchRE[0].includes('Avatar_avatar_heWdk') ||
                  matchRE[0].includes('UserCard_avatar_YGLc_')) &&
                !matchRE[0].includes('Comment_avatar_zNVFT') &&
                !avatar
              ) {
                avatar = match;
              }
            }
          });
        }

        while ((matchRE = twitchRegex.exec(data)) !== null) {
          matchRE.forEach((match, groupIndex) => {
            if (groupIndex === 1 && matchRE !== null) {
              twitch = match;
            }
          });
        }

        if (avatar !== null) {
          await (async () => {
            const response = await fetch(avatar);
            const imageBlob = await response.blob();
            const reader = new FileReader();
            reader.readAsDataURL(imageBlob);
            reader.onloadend = () => {
              avatar = reader.result;
            };
          })();
        }
        setIsAdding(false);
      })
      .catch(error => {
        console.log(error);
      });

    if (nav.includes(boosty) && id.length > 0 && avatar) {
      setFavs({id, avatar, twitch}).then(() => {
        getFavs().then(setFav);
      });
    } else {
      console.log(nav, nav.includes(boosty), id, avatar, boosty);
      Alert.alert('Unable to add', 'You probably trying add something wrong', [
        {
          text: 'OK',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ]);
    }
  };

  const deleteItem = (id: string) => {
    const find = favs.find((item: favsType) => item.id === id);
    if (find) {
      deleteFavs(find).then(() => {
        getFavs().then(setFav);
      });
    }
  };

  return (
    <>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          height: WINDOW_HEIGHT * 0.1,
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'row',
          padding: 8,
          alignItems: 'center',
        }}>
        <BoostyButton
          title={'🔍'}
          buttonStyle={{
            width: 24,
            height: 24,
            marginRight: 6,
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
          }}
          onPress={() => {
            setIsMoving(!isMoving);
          }}
          textStyle={{
            color: 'white',
          }}
        />
        <BoostyButton
          title={'+'}
          onPress={isAdding ? () => {} : handleClick}
          buttonStyle={{
            width: 24,
            height: 24,
            backgroundColor: isAdding ? 'gray' : 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 16,
          }}
          textStyle={{
            color: 'black',
          }}
        />
        <View style={{marginLeft: 6}} />
        {favs.map((item: favsType) => {
          return (
            <Avatar
              key={item.id}
              user={item}
              onPress={() => {
                setNav(boosty + item.id);
              }}
              onGift={() => {
                setNav(`${boosty + item.id}/purchase-gift`);
              }}
              deleteItem={() => {
                deleteItem(item.id);
              }}
            />
          );
        })}
      </ScrollView>
      {isMoving && (
        <View
          style={{
            backgroundColor: 'lightgray',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            padding: 6,
          }}>
          <TextInput
            onChangeText={newText => setText(newText)}
            style={{
              width: '80%',
              marginRight: 6,
            }}
            value={text}
            underlineColorAndroid={'black'}
            selectionColor={'black'}
          />
          <BoostyButton
            title={'go'}
            buttonStyle={{
              width: '15%',
              height: 30,
              backgroundColor: 'black',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 6,
            }}
            onPress={() => {
              if (text.length > 0) {
                setNav(boosty + text);
                setIsMoving(false);
                setText('');
              } else {
                Alert.alert('cant go empty line');
              }
            }}
            textStyle={{
              color: 'white',
            }}
          />
        </View>
      )}
    </>
  );
};

export default Top;
