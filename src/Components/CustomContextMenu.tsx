import * as React from 'react';
import {
  Dimensions,
  Pressable,
  StyleProp,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type menuProps = {
  onPress: () => void;
  setModalLayout: (p: JSX.Element | null) => void;
  actions: [];
  children: React.ReactElement;
  title: string;
};

export default ({
  actions,
  onPress,
  children,
  setModalLayout,
  title,
}: menuProps) => {
  const size = Dimensions.get('window');

  const styles: {
    wrapper: StyleProp<ViewStyle>;
    container: StyleProp<ViewStyle>;
    item: StyleProp<ViewStyle>;
    title: StyleProp<ViewStyle>;
    text: StyleProp<TextStyle>;
  } = {
    title: {
      width: size.width / 2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 3,
    },
    wrapper: {
      position: 'absolute',
      width: size.width,
      height: size.height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255,103,0,0.4)',
      zIndex: 0,
    },
    container: {
      width: size.width / 2,
      maxHeight: size.height / 2,
      backgroundColor: 'white',
      borderRadius: 8,
      paddingBottom: 24,
    },
    item: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      height: 42,
      padding: 8,
      width: size.width / 2,
      borderStyle: 'solid',
      borderWidth: 1,
      borderColor: 'rgba(255,103,0,1)',
    },
    text: {
      fontWeight: 'bold',
      color: 'rgba(255,103,0,1)',
    },
  };

  const menu = (
    <Pressable onPress={() => setModalLayout(null)} style={styles.wrapper}>
      <Pressable
        onPress={event => event.stopPropagation()}
        style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.text}>{title}</Text>
        </View>
        {actions.map(elem => (
          <Pressable
            key={elem.title}
            onPress={() => {
              elem.func();
              setModalLayout(null);
            }}
            style={styles.item}>
            <View style={{width: 32, height: 32, marginRight: 6}}>
              {elem.icon}
            </View>
            <Text style={styles.text}>{elem.title}</Text>
          </Pressable>
        ))}
      </Pressable>
    </Pressable>
  );
  return (
    <Pressable
      onLongPress={() => {
        setModalLayout(menu);
      }}
      onPress={onPress}>
      {children}
    </Pressable>
  );
};
