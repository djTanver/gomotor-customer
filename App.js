import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  StatusBar,
  Image,
} from 'react-native';
import {LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import MainStack from './src/navigation/mainStack';
import configureStore from './src/store/storeConfig/store';

export const {store, persistor} = configureStore();

LogBox.ignoreAllLogs();

export const navigationRef = React.createRef();

const App = () => {
  const [splashScreen, setSplashScreen] = useState(true);

  const hide_Splash_Screen = () => {
    setSplashScreen(false);
  };
  useEffect(() => {
    // code here
    setTimeout(() => {
      hide_Splash_Screen();
    }, 3000);
  }, []);

  const Splash_ScreenView = () => {
    return (
      <View style={styles.SplashScreen_RootView}>
        <View style={styles.SplashScreen_ChildView}>
          <Image
            // source={{
            //   uri:
            //     'https://static.javatpoint.com/tutorial/react-native/images/react-native-tutorial.png',
            // }}
            // source={{
            //   uri: `http://3.239.78.166:1337/uploads/Logo_Gif_Final_7935f85fb0.gif`,
            // }}
            // source={require(`./src/assets/LogoGif.gif`)}
            source={require('./src/assets/logo.png')}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
      </View>
    );
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {splashScreen ? Splash_ScreenView : <MainStack />}
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
  },

  SplashScreen_RootView: {
    justifyContent: 'center',
    flex: 1,
    // margin: 20,
    position: 'absolute',
    width: '100%',
    height: '100%',
    padding: '20%',
    backgroundColor: '#ffffff',
  },

  SplashScreen_ChildView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    // backgroundColor: '#00B9EC',
    flex: 1,
  },
});
