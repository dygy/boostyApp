import * as React from 'react';
import {useEffect, useState} from 'react';
import {Alert, Button, ScrollView} from 'react-native';
import Avatar from './Avatar';
import {deleteFavs, getFavs, setFavs} from '../helpers/storage';

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
                !matchRE[0].includes('Comment_avatar_zNVFT')
              ) {
                avatar = match;
              }
            }
          });
        }

        while ((matchRE = twitchRegex.exec(data)) !== null) {
          matchRE.forEach((match, groupIndex) => {
            if (groupIndex === 1 && matchRE !== null) {
              console.log(`Found match ${match}`, matchRE[0]);
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
    <ScrollView
      horizontal={true}
      style={{
        height: WINDOW_HEIGHT * 0.07,
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
      }}>
      <Button title={'+'} disabled={isAdding} onPress={handleClick} />
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
  );
};

export default Top;
