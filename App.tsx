/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Dimensions,
  Linking,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {WebView} from 'react-native-webview';
import Top from './src/Components/Top';
import {LanguageProvider} from './src/context/language-context';
import type {WebViewNavigation} from 'react-native-webview/lib/WebViewTypes';

const App = () => {
  const boosty = 'https://boosty.to/';
  const isDarkMode = useColorScheme() === 'dark';
  const [nav, setNav] = useState(boosty);
  const [isAdding, setIsAdding] = useState(false);
  const [modalLayout, setModalLayout] = useState(null);

  const WINDOW_HEIGHT = Dimensions.get('window').height;
  const jsCode = 'window.postMessage(window.innerHTML)';

  const backgroundStyle = {
    backgroundColor: Colors.darker,
  };

  const handleNav = (event: WebViewNavigation) => {
    console.log('Received: ', event.url);
    if (event.url.includes(boosty)) {
      setNav(event.url);
    } else {
      setNav(boosty);
      Linking.canOpenURL(event.url).then(supported => {
        if (supported) {
          Linking.openURL(event.url);
        } else {
          console.log(`Don't know how to open URI: ${event.url}`);
        }
      });
    }
  };

  let WebViewRef;

  return (
    <LanguageProvider>
      <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <Top
          boosty={boosty}
          nav={nav}
          setNav={setNav}
          isAdding={isAdding}
          WINDOW_HEIGHT={WINDOW_HEIGHT}
          setIsAdding={setIsAdding}
          setModalLayout={setModalLayout}
        />
        <View style={{width: '100%', height: WINDOW_HEIGHT * 0.9}}>
          <WebView
            userAgent="Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3714.0 Mobile Safari/537.36"
            ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
            javaScriptEnabled={true}
            injectedJavaScript={jsCode}
            onLoadingError={() => WebViewRef && WebViewRef.reload()}
            onLoadingFinish={console.log}
            onLoadingProgress={console.log}
            onLoadingStart={console.log}
            onHttpError={console.log}
            onNavigationStateChange={handleNav}
            onMessage={event => console.log('Received: ', event)}
            source={{uri: nav}}
          />
        </View>
        {modalLayout}
      </SafeAreaView>
    </LanguageProvider>
  );
};

export default App;
