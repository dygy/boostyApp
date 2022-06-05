import React from 'react';
import {Text, Pressable, StyleProp, ViewStyle, TextStyle} from 'react-native';
type props = {
  onPress: () => void;
  textStyle: StyleProp<TextStyle>;
  buttonStyle: StyleProp<ViewStyle>;
  title: string;
};

export default ({onPress, title = 'Save', buttonStyle, textStyle}: props) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </Pressable>
  );
};
